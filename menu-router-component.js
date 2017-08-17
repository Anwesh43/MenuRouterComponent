const w = window.innerWidth,h = window.innerHeight

class MenuRouterComponent extends HTMLElement {
    constructor() {
        super()
        this.div = document.createElement('div')
        const shadow = this.attachShadow({mode:'open'})
        console.log(this.children)
        for(var i=0;i<this.children.length;i++) {
            var br = document.createElement('br')
            var child = this.children[i]
            console.log(child)
            shadow.appendChild(child)
            shadow.appendChild(br)
        }
    }
    render() {

    }
    componentDidMount() {
        this.render()
    }
}
class MenuComponent extends HTMLElement{
    constructor() {
        super()
        this.img = document.createElement('img')
        const shadow = this.attachShadow({mode:'open'})
        this.text = this.innerHTML
        shadow.appendChild(this.img)
    }
    update() {
        this.menu.update()
    }
    startUpdating(dir) {
        this.menu.startUpdating(dir)
    }
    stopped() {
        return this.menu.stopped()
    }
    render() {
        const canvas = document.createElement('canvas')
        canvas.width = w/3
        canvas.height = h/12
        const context = canvas.getContext('2d')
        if(!this.menu) {
            this.menu = new Menu(this.text)
        }
        this.menu.draw(context,canvas.width,canvas.height)
        this.img.src = canvas.toDataURL()
    }
    connectedCallback() {
        this.render()
        this.img.onmousedown = ()=> {
            if(this.menu.scale == 0) {
                animHandler.startAnimating(this)
            }
        }
    }
}
class Menu {
    constructor(text) {
        this.text = text
        this.scale = 0
        this.dir = 0
    }
    draw(context,w,h) {
        context.globalAlpha = 1
        context.font = context.font.replace(/\d{2}/,h/3)
        context.save()
        context.translate(w/2,h/2)
        context.fillStyle = 'gray'
        context.fillRect(-w/2,-h/2,w,h)
        context.save()
        context.scale(this.scale,1)
        context.globalAlpha = 0.3
        context.fillStyle = 'black'
        context.fillRect(-w/2,-h/2,w,h)
        context.restore()
        context.fillStyle = 'white'
        var tw = context.measureText(this.text).width
        context.fillText(this.text,-tw/2,0)
        context.restore()
    }
    update() {
        this.scale += 0.2*this.dir
        console.log(this.scale)
        if(this.scale >1 || this.scale < 0) {
            this.dir = 0
            if(this.scale > 1) {
                this.scale = 1
            }
            if(this.scale < 0) {
                this.scale = 0
            }
        }

    }
    stopped() {
        return this.dir == 0
    }
    startUpdating(dir) {
        this.dir = dir
    }
}
class AnimHandler {
    constructor() {
        this.animated = false
    }
    startAnimating(curr) {
        console.log("coming here")
        if(!this.animated) {
            this.animated = true
            curr.startUpdating(1)
            if(this.prev) {
                this.prev.startUpdating(-1)
            }
            const interval = setInterval(()=>{
                curr.render()
                curr.update()
                if(this.prev) {
                    this.prev.render()
                    this.prev.update()
                }
                if(curr.stopped()) {
                    this.prev = curr
                    this.animated = false
                    clearInterval(interval)
                }
            },75)
        }
    }
}
var animHandler = new AnimHandler()
customElements.define('menu-router-comp',MenuRouterComponent)
customElements.define('menu-comp',MenuComponent)
