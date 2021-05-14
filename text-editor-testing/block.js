import {blockArray} from "./editor.js";

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
            // console.log(this.shadowRoot.que);
            this.contentEditable = true;
            this.controller = controller;
            this.currentBlock = null;
            blockArray.push(this);
            controller.currentBlockIndex = blockArray.length - 1;
            callback(true);
        });
        
        
	}

	connectedCallback(){
		let textBlock = this.shadowRoot.getElementById("textBlock");
		textBlock.focus();

		textBlock.addEventListener("input",() =>{
			let content = textBlock.innerHTML;
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

        textBlock.onfocus = () => {
            console.log(this);
            this.controller.currentBlockIndex = blockArray.indexOf(this);
        };

		textBlock.onkeydown = (e)=>{
			let key = e.keyCode || e.charCode;
			if (key == 8 || key == 46){
				// console.log(textBlock.innerHTML);
				if(textBlock.innerHTML == "" || textBlock.innerHTML == '<ul><li class="notesList" placeholder="Note"></li></ul>' || textBlock.innerHTML == "<ul><li><br></li></ul>"){
					while(textBlock.classList.length > 0){
						textBlock.classList.remove(textBlock.classList[0]);
					}
					textBlock.setAttribute("placeholder", 'Type "/" to create a block');
					textBlock.innerHTML = "";
				}
			} else if (key == 13){
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
			} else if (key == 40){
                console.log("here");
                this.controller.moveToNextBlock();
            }

		};
	}
}


window.customElements.define('text-block', TextBlock);