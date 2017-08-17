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
