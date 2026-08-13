import Tools from "../../../canvas/constants/tools"
import { TkinterWidgetBase } from "./base"


class Sizegrip extends TkinterWidgetBase{

    static widgetType = "sizegrip"
    static displayName = "Sizegrip"

    constructor(props) {
        super(props)

        this.minSize = {width: 10, height: 10}

        this.state = {
            ...this.state,
            size: { width: 16, height: 16 },
            fitContent: {width: true, height: true},
            widgetName: "Sizegrip",
            attrs: {
                ...this.state.attrs,
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#fff0")
    }

    generateCode(variableName, parent){

        return [
                `${variableName} = ttk.Sizegrip(master=${parent})`,
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
        return (
            <div className="tw-w-full tw-h-full tw-flex tw-place-items-end tw-place-content-end"
                    ref={this.styleAreaRef}
                    style={this.getInnerRenderStyling()}>
                <div className="tw-grid tw-grid-cols-2 tw-gap-[1px] tw-w-[14px] tw-h-[14px]">
                    <div className="tw-border-r tw-border-b tw-border-solid tw-border-gray-500" />
                    <div className="tw-border-b tw-border-solid tw-border-gray-500" />
                    <div className="tw-border-r tw-border-solid tw-border-gray-500" />
                    <div />
                </div>
            </div>
        )
    }

}


export default Sizegrip
