import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { CustomTkWidgetBase } from "./base"


class Scrollbar extends CustomTkWidgetBase{

    static widgetType = "scrollbar"
    static displayName = "Scrollbar"

    constructor(props) {
        super(props)

        this.minSize = {width: 10, height: 30}

        this.state = {
            ...this.state,
            size: { width: 15, height: 100 },
            widgetName: "Scrollbar",
            attrs: {
                ...this.state.attrs,
                orientation: {
                    label: "Orientation",
                    tool: Tools.SELECT_DROPDOWN,
                    toolProps: {placeholder: "select orientation"},
                    value: "vertical",
                    options: [{value: "vertical", label: "vertical"}, {value: "horizontal", label: "horizontal"}],
                    onChange: (value) => this.setAttrValue("orientation", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#fff")
    }

    getConfigCode(){
        const config = {}
        return config
    }

    generateCode(variableName, parent){

        const orient = this.getAttrValue("orientation") === "horizontal" ? "ctk.HORIZONTAL" : "ctk.VERTICAL"

        return [
                `${variableName} = ctk.CTkScrollbar(master=${parent}, orientation="${this.getAttrValue("orientation")}")`,
                `${variableName}.${this.getLayoutCode()}`
            ]
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
        const isVertical = this.getAttrValue("orientation") !== "horizontal"

        return (
            <div className="tw-w-full tw-h-full tw-flex tw-place-content-center tw-place-items-center"
                    ref={this.styleAreaRef}
                    style={this.getInnerRenderStyling()}>
                <div className={`tw-bg-gray-300 tw-border tw-border-solid tw-border-gray-500 tw-rounded-sm
                                    ${isVertical ? "tw-w-[12px] tw-h-full" : "tw-h-[12px] tw-w-full"}`}>
                    <div className="tw-bg-gray-500 tw-rounded-sm tw-mx-[2px] tw-my-[2px] tw-h-[30px]" />
                </div>
            </div>
        )
    }

}


export default Scrollbar
