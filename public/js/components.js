// Component System for Vanilla JavaScript
class Component {
  constructor(element, props = {}) {
    this.element = element;
    this.props = props;
    this.init();
  }

  init() {
    // Override in child classes
  }

  render() {
    // Override in child classes
  }

  setProps(newProps) {
    this.props = { ...this.props, ...newProps };
    this.render();
  }
}

// Hero Component
class Hero extends Component {
  init() {
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <header class="header">
        <h1 class="header__title">${this.props.title || '🚀 TypeScript API'} <span class="badge">${this.props.badge || 'Vercel'}</span></h1>
        <p class="header__subtitle">${this.props.subtitle || 'Node.js TypeScript API deployed on Vercel'}</p>
      </header>
    `;
  }
}

// Card Component
class Card extends Component {
  init() {
    this.render();
  }

  render() {
    const { title, method, endpoint, description, buttons, bodyExample, fullWidth, result } = this.props;
    
    this.element.innerHTML = `
      <div class="endpoint-card ${fullWidth ? 'endpoint-card--full-width' : ''}">
        <div class="endpoint-card__header">
          <h3 class="endpoint-card__title">${title}</h3>
          <span class="endpoint-card__method ${method === 'POST' ? 'endpoint-card__method--post' : ''}">${method}</span>
        </div>
        <code class="endpoint-card__endpoint">${endpoint}</code>
        <p class="endpoint-card__description">${description}</p>
        ${this.renderButtons(buttons)}
        ${bodyExample ? `<p class="endpoint-card__body-example">Body: <code>${bodyExample}</code></p>` : ''}
        
        <!-- Results Preview Area -->
        <div class="endpoint-card__results">
          <div class="endpoint-card__results-header">
            <span class="endpoint-card__results-title">Response Preview</span>
            <button class="endpoint-card__refresh-btn" onclick="window.app.refreshEndpoint('${endpoint}')" title="Refresh data">
              🔄
            </button>
          </div>
          <div class="endpoint-card__results-content" id="results-${endpoint.replace(/[^a-zA-Z0-9]/g, '-')}">
            <div class="endpoint-card__loading">Click a button to test this endpoint</div>
          </div>
        </div>
      </div>
    `;
  }

  renderButtons(buttons = []) {
    if (buttons.length === 0) return '';
    
    if (buttons.length === 1) {
      return `<button onclick="window.app.testEndpoint('${this.props.endpoint}', '${buttons[0].onclick}')" class="button button--primary">${buttons[0].text}</button>`;
    }
    
    return `
      <div class="button-group">
        ${buttons.map(btn => `
          <button onclick="window.app.testEndpoint('${this.props.endpoint}', '${btn.onclick}')" class="button button--${btn.variant || 'primary'}">${btn.text}</button>
        `).join('')}
      </div>
    `;
  }

  // Method to update the results preview
  updateResults(data, loading = false) {
    const resultsContainer = this.element.querySelector('.endpoint-card__results-content');
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
}

// Button Component
class Button extends Component {
  init() {
    this.render();
  }

  render() {
    const { text, variant = 'primary', onclick, disabled = false } = this.props;
    
    this.element.innerHTML = `
      <button 
        onclick="${onclick}" 
        class="button button--${variant}"
        ${disabled ? 'disabled' : ''}
      >
        ${text}
      </button>
    `;
  }
}

// Grid Component
class Grid extends Component {
  init() {
    this.render();
  }

  render() {
    const { children, className = '' } = this.props;
    
    this.element.innerHTML = `
      <div class="endpoints-grid ${className}">
        ${children}
      </div>
    `;
  }
}

// Result Component
class Result extends Component {
  init() {
    this.render();
  }

  render() {
    const { visible = false, title = 'Result' } = this.props;
    
    this.element.innerHTML = `
      <div id="resultado" class="result ${visible ? '' : 'result--hidden'}">
        <h3 class="result__title">${title}</h3>
        <pre id="resultado-contenido" class="result__content"></pre>
      </div>
    `;
  }

  show() {
    this.element.querySelector('.result').classList.remove('result--hidden');
  }

  hide() {
    this.element.querySelector('.result').classList.add('result--hidden');
  }

  setContent(content) {
    const contentElement = this.element.querySelector('#resultado-contenido');
    if (contentElement) {
      contentElement.textContent = content;
    }
  }
}

// Footer Component
class Footer extends Component {
  init() {
    this.render();
  }

  render() {
    const { text = 'Built with TypeScript and deployed on Vercel' } = this.props;
    
    this.element.innerHTML = `
      <footer class="footer">
        <p>${text}</p>
      </footer>
    `;
  }
}

// Section Title Component
class SectionTitle extends Component {
  init() {
    this.render();
  }

  render() {
    const { text } = this.props;
    
    this.element.innerHTML = `
      <h2 class="section-title">${text}</h2>
    `;
  }
}

// Export components for use
window.Components = {
  Hero,
  Card,
  Button,
  Grid,
  Result,
  Footer,
  SectionTitle
};
