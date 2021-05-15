import {blockArray} from "./editor.js";
import * as shadow from "./node_modules/shadow-selection-polyfill/shadow.js";
var script = document.createElement("SCRIPT");
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(script);

export class TextBlock extends HTMLElement{
	constructor(controller, callback){
		super();
        fetch("./block.html").then((response) => {
            return response.text();
        }).then((html) =>{
            let parser = new DOMParser();
            let blockTemplateFile = parser.parseFromString(html, 'text/html');
            let blockTemplate = blockTemplateFile.getElementById("block");
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(blockTemplate.content.cloneNode(true));
            // console.log(this.shadowRoot.getSelection());
            this.root = this.shadowRoot;
            this.contentEditable = true;
            this.controller = controller;
            this.currentBlock = null;
            this.currentPointerSpot = 0; 
            this.setCurrentSpot();
            callback(true);
        });
        
        
	}

    setCurrentSpot(){
        let container = this.shadowRoot.getElementById("textBlock");
        // console.log(window.screenY + (window.outerHeight - window.innerHeight));
        let sel = this.ownerDocument.getSelection();
        if(this.ownerDocument.getSelection() != undefined){
            if (sel.rangeCount > 0){
                let range = shadow.getRange(this.shadowRoot);
                if (range != undefined){
                    let preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(container);
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    console.log(range.getClientRects()[0]);
                    this.currentPointerSpot = preCaretRange.toString().length;
                }
            }
        } else if ((sel = this.ownerDocument.selection) && sel.type != "Control"){
            let textRange = sel.createRange();
            let preCarretTextRange = this.ownerDocument.body.createTextRange();
            preCarretTextRange.moveToElementText(container);
            preCarretTextRange.setEndPoint("EndToEnd", textRange);
            this.currentPointerSpot = (textRange.getClientRects()[0] != undefined) ? textRange.getClientRects()[0].x : preCarretTextRange.text.length + 10;
        }
        
    }

    moveToSpot(newSpot, up){
        let container = this.shadowRoot.getElementById("textBlock");
        // let textRange = document.createRange();
        // textRange.setStart(textRange.endContainer, container.textContent.length - 1);
        // textRange.setEnd(textRange.endContainer, container.textContent.length - 1);
        // textRange.collapse(false);
        // window.getSelection().removeAllRanges();
        // window.getSelection().addRange(textRange);
        container.focus();
        // let textRange = document.createRange();
        // textRange.setStart(container, 0);
        // textRange.collapse(true);
        // window.getSelection().removeAllRanges();
        // window.getSelection().addRange(textRange);
        
        // if (textRange.getClientRects()[0] != undefined){
        //     textRange.getClientRects()[0].x = this.currentPointerSpot;
        // }
        // console.log(textRange.getClientRects()[0]);
        
        // textRange.getClientRects()[0].x = this.currentPointerSpot;
        // let container = this.shadowRoot.getElementById("textBlock");
        // let yclickspot = this.getClientRects()[0].y + 4;
        // let xclickspot = this.currentPointerSpot;
        // if (up) {
        //     // let lineHeight = container.classList.contains("header 1") ? 50 : ((container.classList.contains("header 2")) ? 36 : 26);
        //     yclickspot = yclickspot + container.offsetHeight - 30;
        // } else {
        //     yclickspot = yclickspot + 16;
        // }
        // if (newSpot > this.currentPointerSpot){
        //     xclickspot = newSpot;
        // }
        // console.log(yclickspot);
        // console.log(window.screenY);
        // console.log(window.innerHeight);
        // yclickspot = yclickspot + window.screenY + (window.outerHeight - window.innerHeight);
        // xclickspot =  window.screenX - xclickspot;
        // jQuery(document.elementFromPoint(xclickspot, yclickspot)).click();

        // const event = new FocusEvent('onfocusin', {
        //     'screenX': xclickspot,
        //     'screenY': yclickspot,
        //     'relatedTarget': this,
        //     'view': Window
        // })

        // const event = new MouseEvent('click', {
        //     'screenX': xclickspot,
        //     'screenY': yclickspot,
        //     'bubbles': true,
        //     'cancelable': true,
        //     'view': window
        // });
        // console.log(event);
        // container.focus();
        
    }

	connectedCallback(){
		let textBlock = this.shadowRoot.getElementById("textBlock");
		textBlock.focus();
        textBlock.onclick = (e) => {
            textBlock.focus()
        };
		textBlock.addEventListener("input",() =>{
			let content = textBlock.innerHTML;
            this.setCurrentSpot();
			console.log(content);
			if (content == "#&nbsp;"){
				while(textBlock.classList.length > 0){
					textBlock.classList.remove(textBlock.classList[0]);
				}
				textBlock.setAttribute("placeholder", "Header 1");
				textBlock.classList.add("header1");
				textBlock.innerHTML = "";
			} else if (content == "##&nbsp;"){
				while(textBlock.classList.length > 0){
					textBlock.classList.remove(textBlock.classList[0]);
				}
				textBlock.setAttribute("placeholder", "Header 2");
				textBlock.classList.add("header2");
				textBlock.innerHTML = "";
			} else if (content == "-&nbsp;"){
				while(textBlock.classList.length > 0){
					textBlock.classList.remove(textBlock.classList[0]);
				}
				textBlock.setAttribute("placeholder", 'Type "/" to create a block');
				textBlock.innerHTML = "<ul><li class='notesList' placeholder='Note'></li></ul>";
			} else if (content.includes("<ul><li")){
				if (textBlock.textContent == ""){
					textBlock.innerHTML = "<ul><li class='notesList' placeholder='Note'></li></ul>";
				}
			} else if (content == "<div><br></div>"){
				while(textBlock.classList.length > 0){
					textBlock.classList.remove(textBlock.classList[0]);
				}
				textBlock.setAttribute("placeholder", 'Type "/" to create a block');
				textBlock.innerHTML = "";
			}
		});

        textBlock.onfocus = (e) => {
            console.log(e);
            this.setCurrentSpot();
            this.controller.currentBlockIndex = blockArray.indexOf(this);
            
            // shadow.getRange(this.shadowRoot).getClientRects()[0].x = this.currentPointerSpot;
            // 
            // let yclickspot = this.getClientRects()[0].y + 4;
            // let xclickspot = this.currentPointerSpot;
            // if (up) {
            //     // let lineHeight = container.classList.contains("header 1") ? 50 : ((container.classList.contains("header 2")) ? 36 : 26);
            //     yclickspot = yclickspot + container.offsetHeight - 30;
            // } else {
            //     yclickspot = yclickspot + 16;
            // }
            // if (newSpot > this.currentPointerSpot){
            //     xclickspot = newSpot;
            // }
            // console.log(yclickspot);
            // console.log(window.screenY);
            // console.log(window.innerHeight);
            // yclickspot = yclickspot + window.screenY + (window.outerHeight - window.innerHeight);
            // xclickspot = xclickspot + window.screenX;

        };

		textBlock.onkeydown = (e)=>{
			let key = e.key || e.keyCode;
            console.log(this.currentPointerSpot);
            console.log(textBlock.textContent.length);
			if (key == "Backspace" || key == "Delete"){
                if (textBlock.innerHTML == "" && textBlock.getAttribute('placeholder') == 'Type "/" to create a block' && blockArray.length > 1){
                    console.log("hello");
                    this.controller.removeBlock();
                } else if(textBlock.innerHTML == "" || textBlock.innerHTML == '<ul><li class="notesList" placeholder="Note"></li></ul>' || textBlock.innerHTML == "<ul><li><br></li></ul>" || textBlock.innerHTML == "<br>"){
					while(textBlock.classList.length > 0){
						textBlock.classList.remove(textBlock.classList[0]);
					}
					textBlock.setAttribute("placeholder", 'Type "/" to create a block');
					textBlock.innerHTML = "";
				}
			} else if (key == "Enter"){
				let content = textBlock.innerHTML;
				if (content == "/h1"){
					while(textBlock.classList.length > 0){
						textBlock.classList.remove(textBlock.classList[0]);
					}
					textBlock.setAttribute("placeholder", "Header 1");
					textBlock.classList.add("header1");
					textBlock.innerHTML = "";
					e.preventDefault();
				} else if (content == "/h2"){
					while(textBlock.classList.length > 0){
						textBlock.classList.remove(textBlock.classList[0]);
					}
					textBlock.setAttribute("placeholder", "Header 2");
					textBlock.classList.add("header2");
					textBlock.innerHTML = "";
					e.preventDefault();
				} else if (content == "/note"){
					while(textBlock.classList.length > 0){
						textBlock.classList.remove(textBlock.classList[0]);
					}
					textBlock.setAttribute("placeholder", 'Type "/" to create a block');
					textBlock.innerHTML = "<ul><li class='notesList' placeholder='Note'></li></ul>";
				} else {
                    this.controller.addNewBlock();
                    e.preventDefault();
                }
			} else if (key == "ArrowDown"){
                if (this.currentPointerSpot == textBlock.textContent.length){
                    this.controller.moveToNextBlock();
                } 
            } else if (key == "ArrowUp"){
                if (this.currentPointerSpot == 0){
                    this.controller.moveToPreviousBlock();
                } 
            }

		};

        textBlock.onkeyup = (e) => {
            let key = e.key || e.keyCode;
            if (key == "ArrowRight" || key == "ArrowLeft" || ((key == "ArrowDown" && this.currentPointerSpot != textBlock.textContent.length) || (key == "ArrowUp" && this.currentPointerSpot != 0))){
                this.setCurrentSpot();
            }
        };
	}
}


window.customElements.define('text-block', TextBlock);