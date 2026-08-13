import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterWidgetBase } from "./base"


class Canvas extends TkinterWidgetBase{

    static widgetType = "canvas"
    static displayName = "Canvas"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            size: { width: 180, height: 120 },
            widgetName: "Canvas",
            attrs: {
                ...this.state.attrs,
                shape: {
                    label: "Shape",
                    tool: Tools.SELECT_DROPDOWN,
                    toolProps: {placeholder: "select shape"},
                    value: "rectangle",
                    options: [
                        {value: "rectangle", label: "Rectangle"},
                        {value: "oval", label: "Oval"},
                        {value: "line", label: "Line"},
                        {value: "text", label: "Text"}
                    ],
                    onChange: (value) => this.setAttrValue("shape", value)
                },
                shapeColor: {
                    label: "Shape color",
                    tool: Tools.COLOR_PICKER,
                    value: "#3498db",
                    onChange: (value) => this.setAttrValue("shapeColor", value)
                },
                canvasText: {
                    label: "Canvas text",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "text", maxLength: 60},
                    value: "Hello!",
                    onChange: (value) => this.setAttrValue("canvasText", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#fff")
    }

    getConfigCode(){
        const config = {
            bg: `"${this.getAttrValue("styling.backgroundColor")}"`,
        }
        return config
    }

    generateCode(variableName, parent){

        const config = convertObjectToKeyValueString(this.getConfigCode())
        const shape = this.getAttrValue("shape")
        const color = this.getAttrValue("shapeColor")

        const code = [
            `${variableName} = tk.Canvas(master=${parent})`,
            `${variableName}.config(${config})`,
        ]

        const {width, height} = this.getSize()

        if (shape === "rectangle"){
            code.push(`${variableName}.create_rectangle(10, 10, ${Math.max(30, width - 10)}, ${Math.max(30, height - 10)}, fill="${color}")`)
        }else if (shape === "oval"){
            code.push(`${variableName}.create_oval(10, 10, ${Math.max(30, width - 10)}, ${Math.max(30, height - 10)}, fill="${color}")`)
        }else if (shape === "line"){
            code.push(`${variableName}.create_line(10, ${height / 2}, ${Math.max(30, width - 10)}, ${height / 2}, fill="${color}", width=4)`)
        }else if (shape === "text"){
            code.push(`${variableName}.create_text(${width / 2}, ${height / 2}, text="${this.getAttrValue("canvasText")}", fill="${color}", font=("Arial", 16))`)
        }

        code.push(`${variableName}.${this.getLayoutCode()}`)

        return code
    }

    getToolbarAttrs(){
        const toolBarAttrs = super.getToolbarAttrs()

        return ({
            id: this.__id,
            widgetName: toolBarAttrs.widgetName,
            size: toolBarAttrs.size,
            ...this.state.attrs,
        })
    }

    renderContent(){
        const shape = this.getAttrValue("shape")
        const color = this.getAttrValue("shapeColor")

        return (
            <div className="tw-w-flex tw-flex-col tw-w-full tw-h-full tw-rounded-md tw-overflow-hidden">
                <div className="tw-p-1 tw-w-full tw-h-full tw-place-content-center tw-place-items-center"
                        ref={this.styleAreaRef}
                        style={this.getInnerRenderStyling()}>
                    {
                        shape === "rectangle" &&
                        <div className="tw-w-[80%] tw-h-[70%] tw-rounded-sm" style={{backgroundColor: color}} />
                    }
                    {
                        shape === "oval" &&
                        <div className="tw-w-[80%] tw-h-[70%] tw-rounded-full" style={{backgroundColor: color}} />
                    }
                    {
                        shape === "line" &&
                        <div className="tw-w-[80%] tw-h-[4px] tw-rounded-full" style={{backgroundColor: color}} />
                    }
                    {
                        shape === "text" &&
                        <div className="tw-text-sm tw-text-gray-700">{this.getAttrValue("canvasText")}</div>
                    }
                </div>
            </div>
        )
    }

}


export default Canvas
