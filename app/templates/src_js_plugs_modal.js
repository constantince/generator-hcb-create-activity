function CreateModal () {
    this.styles = `
        display: none;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 1, 0.7);
        
    `;
    this.el = null;
    this.children = {};
    this.init();
}

CreateModal.prototype.model = function() {
    this.el = $(`<div style=\"${this.styles}\" />`);
}


CreateModal.prototype.init = function() {
    this.model();
}

CreateModal.prototype.combine = function(innerbox) {
    this.el.appendTo($('body'));
    this.children = innerbox;
    return this;
}

CreateModal.prototype.show = function(status) {
    this.el.html(this.children[status]);
    this.el.css({display: 'flex'});
}

CreateModal.prototype.hide = function() {
    this.el.hide();
}

export default CreateModal;