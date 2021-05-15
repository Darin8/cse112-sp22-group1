import { TextBlock } from "./block.js";
let contentWrapper = document.getElementById("contentWrapper");
export var blockArray = [];
var idTable = [];
var controller = {
	currentBlockIndex: 0,
	addNewBlock: () => {
		let newBlock = new TextBlock(controller, (success) => {
			console.log(blockArray.length - 1);
			if (controller.currentBlockIndex < blockArray.length - 1){
				contentWrapper.insertBefore(newBlock, blockArray[controller.currentBlockIndex + 1]);
				blockArray.splice(controller.currentBlockIndex + 1, 0, newBlock);
				controller.currentBlockIndex = controller.currentBlockIndex + 1;
			} else {
				contentWrapper.appendChild(newBlock);
				blockArray.push(newBlock);
				controller.currentBlockIndex = blockArray.length - 1;
			}
			newBlock.focus();
		});
	},
	moveToNextBlock: () => {
		let currentBlock = blockArray[controller.currentBlockIndex];
		console.log("excecutes");
		if (controller.currentBlockIndex < blockArray.length - 1){
			console.log("in here");
			let nextBlock = blockArray[controller.currentBlockIndex + 1];
			nextBlock.moveToSpot(currentBlock.currentPointerSpot, false);
		}
	},
	moveToPreviousBlock: () => {
		let currentBlock = blockArray[controller.currentBlockIndex];
		console.log("excecutes");
		if (controller.currentBlockIndex > 0){
			console.log("in here");
			let nextBlock = blockArray[controller.currentBlockIndex - 1];
			nextBlock.moveToSpot(currentBlock.currentPointerSpot, false);
		}
	},
	removeBlock: () => {
		let currentBlock = blockArray[controller.currentBlockIndex];
		blockArray.splice(controller.currentBlockIndex, 1);
		controller.currentBlockIndex = (controller.currentBlockIndex == 0) ? controller.currentBlockIndex : controller.currentBlockIndex - 1;
		console.log(controller.currentBlockIndex);
		let nextBlock = blockArray[controller.currentBlockIndex];
		console.log(nextBlock);
		nextBlock.moveToSpot(0, false);
		
		contentWrapper.removeChild(currentBlock);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	let newBlock = new TextBlock(controller, (success) => {
		contentWrapper.appendChild(newBlock);
		blockArray.push(newBlock);
		controller.currentBlockIndex = blockArray.length - 1;
		newBlock.focus();
	});
});

document.addEventListener("click", (e) => {
	console.log(e);
});
