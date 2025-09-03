// Main Application Class
class App {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.createComponents();
    this.bindEvents();
    this.testMainEndpoint();
  }

  createComponents() {
    // Create Hero component
    const heroContainer = document.getElementById('hero-container');
    if (heroContainer) {
      this.components.hero = new Components.Hero(heroContainer, CONFIG.hero);
    }

    // Create Section Title
    const sectionTitleContainer = document.getElementById('section-title-container');
    if (sectionTitleContainer) {
      this.components.sectionTitle = new Components.SectionTitle(sectionTitleContainer, {
        text: CONFIG.sections.endpoints
      });
    }

    // Create Grid for endpoints
    const gridContainer = document.getElementById('grid-container');
    if (gridContainer) {
      this.components.grid = new Components.Grid(gridContainer);
      this.renderEndpoints();
    }

    // Create Result component
    const resultContainer = document.getElementById('result-container');
    if (resultContainer) {
      this.components.result = new Components.Result(resultContainer, CONFIG.result);
    }

    // Create Footer component
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      this.components.footer = new Components.Footer(footerContainer, CONFIG.footer);
    }
  }

  renderEndpoints() {
    const gridElement = this.components.grid.element;
    
    // Clear the grid first
    gridElement.innerHTML = '';
    
    // Create and append each card directly to the grid
    CONFIG.endpoints.forEach(endpoint => {
      const cardElement = document.createElement('div');
      const card = new Components.Card(cardElement, endpoint);
      
      // Get the rendered HTML content and append it to the grid
      const cardHTML = cardElement.innerHTML;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cardHTML;
      
      // Append the actual card content, not the wrapper div
      while (tempDiv.firstChild) {
        gridElement.appendChild(tempDiv.firstChild);
      }
    });
  }

  bindEvents() {
    // Global function for testing endpoints
    window.probarEndpoint = this.probarEndpoint.bind(this);
  }

  // New method to test endpoints and update card results
  async testEndpoint(endpoint, buttonAction) {
    try {
      // Find the card for this endpoint
      const cardElement = this.findCardByEndpoint(endpoint);
      if (cardElement) {
        // Show loading in the card
        this.updateCardResults(cardElement, null, true);
        
        // Extract the actual endpoint from button action
        const actualEndpoint = this.extractEndpointFromAction(buttonAction);
        
        // Make the API call
        const response = await fetch(actualEndpoint);
        const data = await response.json();
        
        // Update the card with results
        this.updateCardResults(cardElement, data, false);
        
        // Also update the main result area
        this.components.result.show();
        this.components.result.setContent(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      const cardElement = this.findCardByEndpoint(endpoint);
      if (cardElement) {
        this.updateCardResults(cardElement, { error: error.message }, false);
      }
    }
  }

  // Method to refresh a specific endpoint
  async refreshEndpoint(endpoint) {
    await this.testEndpoint(endpoint, `probarEndpoint('${endpoint}')`);
  }

  // Helper method to find card by endpoint
  findCardByEndpoint(endpoint) {
    const gridElement = this.components.grid.element;
    const cards = gridElement.querySelectorAll('.endpoint-card');
    
    for (let card of cards) {
      const endpointElement = card.querySelector('.endpoint-card__endpoint');
      if (endpointElement && endpointElement.textContent === endpoint) {
        return card;
      }
    }
    return null;
  }

  // Helper method to extract endpoint from button action
  extractEndpointFromAction(action) {
    // Extract endpoint from strings like "probarEndpoint('/api/saludo')"
    const match = action.match(/probarEndpoint\('([^']+)'\)/);
    return match ? match[1] : action;
  }

  // Helper method to update card results
  updateCardResults(cardElement, data, loading = false) {
    const resultsContainer = cardElement.querySelector('.endpoint-card__results-content');
    if (resultsContainer) {
      if (loading) {
        resultsContainer.innerHTML = '<div class="endpoint-card__loading">Loading...</div>';
      } else {
        // Format the data for display
        const formattedData = this.formatDataForDisplay(data);
        resultsContainer.innerHTML = `<div class="endpoint-card__data">${formattedData}</div>`;
      }
    }
  }

  // Format data for display in the card
  formatDataForDisplay(data) {
    if (typeof data === 'string') {
      return `<pre class="endpoint-card__data-text">${data}</pre>`;
    }
    
    if (typeof data === 'object') {
      // Show first few key-value pairs
      const entries = Object.entries(data).slice(0, 3);
      const preview = entries.map(([key, value]) => {
        const displayValue = typeof value === 'string' ? value : JSON.stringify(value);
        return `<div class="endpoint-card__data-item"><strong>${key}:</strong> ${displayValue}</div>`;
      }).join('');
      
      if (Object.keys(data).length > 3) {
        return `${preview}<div class="endpoint-card__data-more">... and ${Object.keys(data).length - 3} more fields</div>`;
      }
      
      return preview;
    }
    
    return `<pre class="endpoint-card__data-text">${JSON.stringify(data, null, 2)}</pre>`;
  }

  async probarEndpoint(endpoint) {
    try {
      // Show loading
      this.components.result.show();
      this.components.result.setContent(CONFIG.result.loadingText);
      
      const response = await fetch(endpoint);
      const data = await response.json();
      
      this.components.result.setContent(JSON.stringify(data, null, 2));
    } catch (error) {
      this.components.result.setContent(CONFIG.result.errorPrefix + error.message);
    }
  }

  testMainEndpoint() {
    // Test main endpoint on load
    setTimeout(() => {
      this.probarEndpoint('/');
    }, 100);
  }

  // Method to update component props
  updateComponent(componentName, newProps) {
    if (this.components[componentName]) {
      this.components[componentName].setProps(newProps);
    }
  }

  // Method to refresh all components
  refresh() {
    Object.values(this.components).forEach(component => {
      if (component.render) {
        component.render();
      }
    });
  }
}

// Initialize app when everything is loaded
window.addEventListener('load', () => {
  window.app = new App();
});
