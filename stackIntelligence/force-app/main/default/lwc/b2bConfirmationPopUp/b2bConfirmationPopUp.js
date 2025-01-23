import { LightningElement, api, track } from "lwc";
import { FORM_FACTOR } from "c/mobileUtils";

const CUSTOM_EVENT = {
    EVENT_POSITIVE_RESPONSE: "positiveresponse",
    EVENT_NEGATIVE_RESPONSE: "negativeresponse"
};

export default class b2bPromptModal extends LightningElement {
    @api headerLabel;
    @api bodyMsg;
    @api positiveResponseButton;
    @api negativeResponseButton;
    @api closeLabel;

    @track positiveButtonDisable = false;
    @track negativeButtonDisable = false;

    get modalDialogClasses() {
        const desktop = "slds-modal slds-fade-in-open";
        const mobile = `${desktop} slds-modal_full`;
        return FORM_FACTOR.isDesktop ? desktop : mobile;
    }
    
    //custom event used by Parent Component to do add action
    handlePositiveResponse() {
        this.positiveButtonDisable = true;
        const selectedEvent = new CustomEvent(CUSTOM_EVENT.EVENT_POSITIVE_RESPONSE, {
            detail: true
        });

        // Dispatches the event
        this.dispatchEvent(selectedEvent);
    }

    //custom event used by Parent Component to do remove action
    handleNegativeResponse() {
        this.negativeButtonDisable = true;
        const selectedEvent = new CustomEvent(CUSTOM_EVENT.EVENT_NEGATIVE_RESPONSE, {
            detail: true
        });

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    //custom event used by Parent Component to do close the modal
    closeModal() {
        const selectedEvent = new CustomEvent(CUSTOM_EVENT.EVENT_NEGATIVE_RESPONSE, {
            detail: true
        });

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    @api getModalSection() {
        return this.template.querySelector("section");
    }
}