import { LightningElement, track, wire, api } from 'lwc';
import { CartItemsAdapter } from 'commerce/cartApi';
import { dispatchActionAsync, createCartClearAction } from 'commerce/actionApi';

export default class b2bClearCartAction extends LightningElement {
    @track showClearCart = false;
    @track modalPrompt = false;

    _clearCartLabel;
    _clearCartTitle;
    _modalHeader;
    _modalBody;
    _positiveButton;
    _negativeButton;

    @api
    get clearCartLabel() {
        return this._clearCartLabel;
    }
    set clearCartLabel(value) {
        this._clearCartLabel = value;
    }

    @api
    get clearCartTitle() {
        return this._clearCartTitle;
    }
    set clearCartTitle(value) {
        this._clearCartTitle = value;
    }

    @api
    get modalHeader() {
        return this._modalHeader;
    }
    set modalHeader(value) {
        this._modalHeader = value;
    }

    @api
    get modalBody() {
        return this._modalBody;
    }
    set modalBody(value) {
        this._modalBody = value;
    }

    @api
    get positiveButton() {
        return this._positiveButton;
    }
    set positiveButton(value) {
        this._positiveButton = value;
    }

    @api
    get negativeButton() {
        return this._negativeButton;
    }
    set negativeButton(value) {
        this._negativeButton = value;
    }

    /**
     * Checks if the cart has items and toggles the visibility of the Clear Cart button.
     */
    @wire(CartItemsAdapter)
    setCartItems({ data, error }) {
        if (error) {
            this.showClearCart = false;
        } else {
            this.showClearCart = true;
        }
    }

    /**
     * Displays the modal prompt for confirming the cart clear action.
     */
    handleClearCart() {
        this.modalPrompt = true;
    }

    /**
     * Handles the negative response (cancel action) in the modal.
     */
    handleNegativeResponse() {
        this.modalPrompt = false;
    }

    /**
     * Clears the cart items by dispatching the cart clear action.
     */
    async handleDelete() {
        try {
            await dispatchActionAsync(this, createCartClearAction());
        } catch (error) {
            console.log(error);
        } finally {
            this.modalPrompt = false;
            this.showClearCart = false;
        }
    }
}