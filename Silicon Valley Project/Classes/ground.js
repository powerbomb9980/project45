class Ground{
    constructor(x, y, width, height, image){
        this.image = loadImage(image);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = createSprite(this.x, this.y, this.width, this.height);
        this.sprite.visible = false;
        //this.sprite.addImage("image", this.image);
    
    }

    display(){
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.width, this.height);
    }

} 