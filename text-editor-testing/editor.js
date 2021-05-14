import { TextBlock } from "./block.js";
let contentWrapper = document.getElementById("contentWrapper");
export var blockArray = [];
var idTable = [];
var controller = {
	currentBlockIndex: 0,
	addNewBlock: () => {
		let newBlock = createBlock();
		contentWrapper.appendChild(newBlock);
		newBlock.focus();
		addListeners(newBlock);
	},
	moveToNextBlock: () => {
		let currentBlock = blockArray[controller.currentBlockIndex];
		console.log("excecutes");
		if (controller.currentBlockIndex < blockArray.length - 1){
			console.log("in here")
			let nextBlock = blockArray[controller.currentBlockIndex + 1];
			let selection = window.getSelection();
			let range = selection.getRangeAt(0);
			let currentPosition = range.endOffset;
			selection = window.getSelection();
			let setPos = document.createRange();
			setPos.setStart(nextBlock, 1);
			setPos.collapse(true);
			selection.removeAllRanges();
			nextBlock.focus();
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	let newBlock = createBlock();
	contentWrapper.appendChild(newBlock);
	newBlock.focus();
	addListeners(newBlock);
});

function createBlock(){
	let newElement = document.createElement("div");
	newElement.id = "textBlock";
	newElement.contentEditable = true;
	newElement.setAttribute("placeholder", 'Type "/" to create a block');
	console.log(newElement);
	return newElement;
}

function addListeners(block){
	block.addEventListener("input",() =>{
		let content = textBlock.innerHTML;
		console.log(content);
		if (content == "#&nbsp;"){
			while(block.classList.length > 0){
				block.classList.remove(block.classList[0]);
			}
			block.setAttribute("placeholder", "Header 1");
			block.classList.add("header1");
			block.innerHTML = "";
		} else if (content == "##&nbsp;"){
			while(block.classList.length > 0){
				block.classList.remove(block.classList[0]);
			}
			block.setAttribute("placeholder", "Header 2");
			block.classList.add("header2");
			block.innerHTML = "";
		} else if (content == "-&nbsp;"){
			while(block.classList.length > 0){
				block.classList.remove(block.classList[0]);
			}
			block.setAttribute("placeholder", 'Type "/" to create a block');
			block.innerHTML = "<ul><li class='notesList' placeholder='Note'></li></ul>";
		} else if (content.includes("<ul><li")){
			if (block.textContent == ""){
				block.innerHTML = "<ul><li class='notesList' placeholder='Note'></li></ul>";
			}
		} else if (content == "<div><br></div>"){
			while(block.classList.length > 0){
				block.classList.remove(block.classList[0]);
			}
			block.setAttribute("placeholder", 'Type "/" to create a block');
			block.innerHTML = "";
		}
	});

	block.onkeydown = (e)=>{
		let key = e.keyCode || e.charCode;
		if (key == 8 || key == 46){
			console.log(block.innerHTML);
			if(block.innerHTML == "" || block.innerHTML == '<ul><li class="notesList" placeholder="Note"></li></ul>' || block.innerHTML == "<ul><li><br></li></ul>"){
				while(block.classList.length > 0){
					block.classList.remove(block.classList[0]);
				}
				block.setAttribute("placeholder", 'Type "/" to create a block');
				block.innerHTML = "";
			}
		} else if (key == 13){
			let content = block.innerHTML;
			if (content == "/h1"){
				while(block.classList.length > 0){
					block.classList.remove(block.classList[0]);
				}
				block.setAttribute("placeholder", "Header 1");
				block.classList.add("header1");
				block.innerHTML = "";
				e.preventDefault();
			} else if (content == "/h2"){
				while(block.classList.length > 0){
					block.classList.remove(block.classList[0]);
				}
				block.setAttribute("placeholder", "Header 2");
				block.classList.add("header2");
				block.innerHTML = "";
				e.preventDefault();
			} else if (content == "/note"){
				while(block.classList.length > 0){
					block.classList.remove(block.classList[0]);
				}
				block.setAttribute("placeholder", 'Type "/" to create a block');
				block.innerHTML = "<ul><li class='notesList' placeholder='Note'></li></ul>";
			} else {
				controller.addNewBlock();
				e.preventDefault();
			}
		} else if (key == 40){
			console.log("here");
			contentWrapper.contentEditable = true;
		}
	};

	contentWrapper.onkeyup = (e) => {
		let key = e.keyCode || e.charCode;
		if (key == 40){
			console.log("here");
			contentWrapper.contentEditable = false;
		}
	}
}
