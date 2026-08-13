import Tools from "../../../canvas/constants/tools"
import { TkinterWidgetBase } from "./base"


class Separator extends TkinterWidgetBase{

    static widgetType = "separator"
    static displayName = "Separator"

    constructor(props) {
        super(props)

        this.minSize = {width: 10, height: 10}

        this.state = {
            ...this.state,
            size: { width: 150, height: 10 },
            fitContent: {width: true, height: true},
            widgetName: "Separator",
            attrs: {
                ...this.state.attrs,
                orientation: {
                    label: "Orientation",
                    tool: Tools.SELECT_DROPDOWN,
                    toolProps: {placeholder: "select orientation"},
                    value: "horizontal",
                    options: [{value: "horizontal", label: "horizontal"}, {value: "vertical", label: "vertical"}],
                    onChange: (value) => this.setAttrValue("orientation", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#fff0")
    }

    generateCode(variableName, parent){

        const orient = this.getAttrValue("orientation") === "vertical" ? "tk.VERTICAL" : "tk.HORIZONTAL"

        return [
                `${variableName} = ttk.Separator(master=${parent}, orient=${orient})`,
                `${variableName}.${this.getLayoutCode()}`
            ]
    }

    getImports(){
        const imports = super.getImports()
        imports.push("from tkinter import ttk")
        return imports
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
        const isVertical = this.getAttrValue("orientation") === "vertical"

        return (
            <div className="tw-w-full tw-h-full tw-flex tw-place-content-center tw-place-items-center"
                    ref={this.styleAreaRef}
                    style={this.getInnerRenderStyling()}>
                <div className={`tw-bg-gray-400 ${isVertical ? "tw-w-[2px] tw-h-full" : "tw-h-[2px] tw-w-full"}`} />
            </div>
        )
    }

}


export default Separator
