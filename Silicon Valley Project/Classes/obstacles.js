class Obstacles{
    constructor(x, y, width, height, image){
        this.image = loadImage(image);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = createSprite(this.x, this.y, this.width, this.height);
        this.sprite.visiblity = false;
        this.sprite.addImage("image", this.image);
        this.sprite.scale = 0.15;
    
    } 
}