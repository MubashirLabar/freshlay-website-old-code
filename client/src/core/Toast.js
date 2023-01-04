/**
 * Generates Random ID in abcd-efgh-ijkl-mnop format
 */
const generateID = (len, k) =>{
    const s = (k) => {
        var text = "",
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0 ; i < k; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    var id = s(k);
    if(len > 1){
        for(let n = 0; n<len; n++){ 
            id += "-" + s(k);
        }
    }
    return id;
}

/*
 * Toast Notifications
*/ 
const __Toast = function() {
        let self = this;
        self._toasts = [];
        self._container = null;
        const _defaults = {
            message: "Fancy Toast",
            timeLeft: 4
        }

    const _Toast = (options) => {
        var tout = null,
        ID = 'zuz-toast-' + generateID(5, 4),
        toast = document.createElement('div'),
        btn = document.createElement('button');

        toast.id = ID;
        toast.classList = 'zuz-toast fixed flex fontn anim s14 aic';
        toast.innerHTML = options.html || _defaults.message;

        btn.classList = 'btn font5 s14 ';
        btn.textContent = options.btnTxt || 'OK';
        btn.addEventListener("click", () => {_dismiss() });

        toast.appendChild(btn);
        self._container.appendChild(toast);

        setTimeout(() =>{

            toast.classList.add("zuz-toast-visible");
            self.arrangeToasts( () => {
                tout = setTimeout(() =>{
                    _dismiss();
                }, (options.time || _defaults.timeLeft) * 1000);
            });

        }, 50);

        const _dismiss = () => {
            tout && clearTimeout(tout);
            toast.classList.remove("zuz-toast-visible");
            toast.classList.add("zuz-toast-hidden"); 
            setTimeout( ()=>{
                document.getElementById(ID).parentNode.removeChild(document.getElementById(ID));
                self.arrangeToasts();
            },1000);
            
        }
    }  

    self.moveToast = (toast, bottom) => {
        toast.style.bottom = bottom + 'px';
    }

    self.arrangeToasts = (callback) => {
        let toasts = document.querySelectorAll(".zuz-toast"),
        bottom = 20,
        i = toasts.length;   
        while(i--){
            toasts[i].classList.add('n-' +i);
            self.moveToast(toasts[i], bottom);
            bottom += parseInt( getComputedStyle(toasts[i]).height.replace("px","") ) + 20;
        }
        callback && callback();
    }

    self.createContainer = () => {
        var container = document.createElement('div');
        container.setAttribute('id', 'toast-container');
        document.body.appendChild(container);
        self._container = container;
    }
 
    self.show = (options) => {
        self._container == null && self.createContainer();
        _Toast(options);
    }

    self.dismisAll = () => {
        var toasts = document.querySelectorAll(".zuz-toast"),
        i = toasts.length;
        while(i--){
            toasts[i].parentNode.removeChild(toasts[i]);
        }
    }
 
}
const Toast = new __Toast();  
export default {
    generateID,
    Toast
}