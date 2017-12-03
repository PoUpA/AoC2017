class PuzzleItem {
    public number:number;
    public positionX:number;
    public positionY:number;
    public direction:string;
    constructor(num,posX,posY,direction){
        this.number=num;
        this.positionX=posX;
        this.positionY=posY;
        this.direction = direction;
    }
    
}
class Puzzle {
    
    private puzzle:Array<PuzzleItem>=[];
    

    constructor(number:number){
        this.generatePuzzle(number);
    }

    private generatePuzzle(number:number){
        let index = 0;
        while (index <= number) {
            index = this.addElement();
        }
        
    }

    private addElement():number{
        let nextPositionItem = this.getNextPositionItem();
        let element:PuzzleItem = nextPositionItem;
        this.puzzle.push(element);
        return element.number;
    }
    private getNextPositionItem():PuzzleItem {
        let number=0;
        let positionX:number = 0;
        let positionY:number = 0;
        let direction:string = "down";
        //right,up,left,down
        let previous:PuzzleItem = this.getElement(this.puzzle.length-1);
        
        if(previous!=null){
            switch (previous.direction) {
                case "right":
                    if(this.hasElement(previous.positionX+1,previous.positionY)){
                        positionX = previous.positionX;
                        positionY = previous.positionY+1;
                        direction=previous.direction; 
                    }
                    else{
                        positionX = previous.positionX+1
                        positionY = previous.positionY;
                        direction = "up";
                    }
                    break;
                case "up":
                    if(this.hasElement(previous.positionX,previous.positionY-1)){
                        positionX = previous.positionX+1;
                        positionY = previous.positionY;
                        direction=previous.direction; 
                    }
                    else{
                        positionX = previous.positionX
                        positionY = previous.positionY-1;
                        direction = "left";
                    }
                    break;
                case "left":
                    if(this.hasElement(previous.positionX-1,previous.positionY)){
                        positionX = previous.positionX;
                        positionY = previous.positionY-1;
                        direction=previous.direction; 
                    }
                    else{
                        positionX = previous.positionX-1
                        positionY = previous.positionY;
                        direction = "down";
                    }
                    break;
                case "down":
                    if(this.hasElement(previous.positionX,previous.positionY+1)){
                        positionX = previous.positionX-1;
                        positionY = previous.positionY;
                        direction=previous.direction; 
                    }
                    else{
                        positionX = previous.positionX
                        positionY = previous.positionY+1;
                        direction = "right";
                    }
                    break;
                default:
                    direction = previous.direction;
                    break;
            }
            
        }
        else{
            number=1;
        }
        if(this.hasElement(positionX+1,positionY)){
            number += this.getElementByPos(positionX+1,positionY).number;
        }
        if(this.hasElement(positionX-1,positionY)){
            number += this.getElementByPos(positionX-1,positionY).number;
        }
        if(this.hasElement(positionX+1,positionY+1)){
            number += this.getElementByPos(positionX+1,positionY+1).number;
        }
        if(this.hasElement(positionX-1,positionY+1)){
            number += this.getElementByPos(positionX-1,positionY+1).number;
        }
        if(this.hasElement(positionX,positionY+1)){
            number += this.getElementByPos(positionX,positionY+1).number;
        }
        if(this.hasElement(positionX-1,positionY-1)){
            number += this.getElementByPos(positionX-1,positionY-1).number;
        }
        if(this.hasElement(positionX+1,positionY-1)){
            number += this.getElementByPos(positionX+1,positionY-1).number;
        }
        if(this.hasElement(positionX,positionY-1)){
            number += this.getElementByPos(positionX,positionY-1).number;
        }
        let element:PuzzleItem = new PuzzleItem(number,positionX,positionY,direction)
        return element;

    }
    private hasElement(x:number,y:number):boolean{
        for (let index = 0; index < this.puzzle.length; index++) {
            if(this.puzzle[index].positionX==x && this.puzzle[index].positionY==y){
                return true;
            }
        }
        return false;
    }
    private getElementByPos(x:number,y:number):PuzzleItem{
        for (let index = 0; index < this.puzzle.length; index++) {
            if(this.puzzle[index].positionX==x && this.puzzle[index].positionY==y){
                return this.puzzle[index];
            }
        }
        return null;
    }
    private getElement(index:number):PuzzleItem{
        return this.puzzle[index];
        
    }

    public getDistance(numberStart,numberStop) {
        let startElement = this.getElement(numberStart-1);
        let stopElement = this.getElement(numberStop-1);
        console.log(startElement,stopElement);
        return (Math.max(startElement.positionX,stopElement.positionX)-Math.min(startElement.positionX,stopElement.positionX)+(Math.max(startElement.positionY,stopElement.positionY)-Math.min(startElement.positionY,stopElement.positionY)));
    }

    /**
     * getLastNumber
     */
     public getLastNumber() {
        return this.puzzle[this.puzzle.length-1];
    
    }
}

let day3task1 = new Puzzle(277678);

console.log(day3task1.getLastNumber());