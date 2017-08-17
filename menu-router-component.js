const w = window.innerWidth,h = window.innerHeight
class MenuRouterComponent extends Component {
    constructor() {
        super()
        this.div = document.createElement('div')
        const shadow = this.attachShadow({mode:'open'})
        shadow.appendChild(this.div)
        this.div.style.height = this.children * (this.h/12)
        this.div.style.width = w/3
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
    render() {
        const canvas = document.createElement('canvas')
        canvas.width = w/3
        canvas.height = h/12
        const context = canvas.getContext('2d')
        this.img.src = canvas.toDataURL()
    }
    connectedCallback() {
        this.render()
    }
}
