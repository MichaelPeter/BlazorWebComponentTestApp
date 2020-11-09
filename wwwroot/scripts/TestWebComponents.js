/* Links */

customElements.define('webcomp-link', class extends HTMLElement {
    constructor() {
        super(); // always call super() first in the constructor.

        // Attach a shadow root to <webcomp-link>.
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
          <a href="Counter">ShadowDOM Link</a>
    `;
    }
});

/* Events */

customElements.define('webcomp-event', class extends HTMLElement {
    constructor() {
        super(); // always call super() first in the constructor.

        this._clickCount = 0;
        // Attach a shadow root to <fancy-tabs>.
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <label>
            <input type="checkbox" id="my-checkbox"></input>
            Change to Raise event
            </label>
        `;

        // Internal event listener
        shadowRoot.querySelector('#my-checkbox').addEventListener('click', (e) => {
            this._clickCount++;
            this.customCheckEvent = new CustomEvent("customcheck", {
                detail: {
                    clickCount: this._clickCount,
                    isChecked: e.target.checked
                },
                bubbles: true,
                composed: true,
                cancelable: false,
            });

            this.dispatchEvent(this.customCheckEvent);
            console.log(`input.clickEvent ${e.target.checked}`);
        });

        // internal event listener event
        this.addEventListener("customcheck", (e) => {
            console.log(`innercomponent.clustomcheck: clickcount: + ${e.detail.clickCount} "checked: ${e.detail.isChecked}`);
        });
    }
});

function registerBlazorCustomHandler(component, eventName, callbackClass, callBackMethodName) {
    component.addEventListener(eventName, (e) => {
        console.log(`blazorjshandler clickcount: + ${e.detail.clickCount}`);
        callbackClass.invokeMethodAsync(callBackMethodName, e.detail.isChecked, e.detail.clickCount);
    });
}

// Property SetObject Test

customElements.define('webcomp-property', class extends HTMLElement {
    constructor() {
        super();

        this._linkList = [{ href: "http://dummy.com", text: "dummy link" }];

        this._shadowRoot = this.attachShadow({ mode: 'open' });

        // https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
        this.render();
    }

    get linklist() {
        return this._linkList;
    }

    set linklist(value) {
        this._linkList = value;
        this.render();
    }

    //attributeChangedCallback(attrName, oldVal, newVal) {
    //    if (attrName === LinkListAttributeName)
    //        this.render();
    //}

    render() {
        var lnkListVal = this._linkList;
        //var lnkListVal = this.getAttribute(LinkListAttributeName)

        this._shadowRoot.innerHTML = `
         <div>
          ${lnkListVal.map(lnk => `<a href="${lnk.href}">${lnk.text}</a>`)}
          <br />
         </div>
    `;
    }


    //static get properties() {
    //    return {
    //        linklist: { type: Array },
    //    };
    //}
});

function setWebComponentProperty(webComp, propertyName, value) {
    //webComp.setAttribute(propertyName, value);
    webComp[propertyName] = value;
}
