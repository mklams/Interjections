export default class Point{
    constructor(public x: number, public y: number){}

    public toKey(){
        return this.x+","+this.y;
    }

    public equals(point: Point){
        return (this.x === point.x) 
                && (this.y === point.y);
    }

    static ParseKeyToPoint(posKey: string){
        const parts = posKey.split(",");
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        return new Point(x,y);
    }
}

