import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterBase } from "./base"


class PanedWindow extends TkinterBase{

    static widgetType = "paned_window"
    static displayName = "Paned Window"

    constructor(props) {
        super(props)

        this.droppableTags = {
            exclude: ["image", "video", "media", "toplevel", "main_window"]
        }

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            widgetName: "Paned window",
            size: { width: 220, height: 120 },
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
        this.setAttrValue("styling.backgroundColor", "#EDECEC")
    }

    getConfigCode(){
        const config = {}
        return config
    }

    generateCode(variableName, parent){

        const config = convertObjectToKeyValueString(this.getConfigCode())

        const orient = this.getAttrValue("orientation") === "vertical" ? "tk.VERTICAL" : "tk.HORIZONTAL"

        return [
                `${variableName} = tk.PanedWindow(master=${parent}, orient=${orient}, sashrelief=tk.RAISED)`,
                `${variableName}.config(${config})`,
                `${variableName}.${this.getLayoutCode()}`
            ]
    }

    getToolbarAttrs(){
        const {layout, gridConfig, gridWeights, ...toolBarAttrs} = super.getToolbarAttrs()

        return ({
            id: this.__id,
            ...toolBarAttrs,
            orientation: this.state.attrs.orientation,
            layout,
            gridConfig,
            gridWeights
        })
    }

    renderContent(){
        const isVertical = this.getAttrValue("orientation") === "vertical"

        return (
            <div className="tw-w-flex tw-flex-col tw-w-full tw-h-full tw-rounded-md tw-overflow-hidden">
                <div className="tw-p-2 tw-w-full tw-h-full tw-content-start tw-overflow-hidden"
                        ref={this.styleAreaRef}
                        style={this.getInnerRenderStyling()}>
                    <div className={`tw-flex tw-gap-1 tw-w-full tw-h-full ${isVertical ? "tw-flex-col" : "tw-flex-row"}`}>
                        <div className="tw-flex-1 tw-bg-gray-200 tw-border tw-border-solid tw-border-gray-400 tw-rounded-sm" />
                        <div className="tw-w-[3px] tw-bg-gray-400 tw-cursor-col-resize" />
                        <div className="tw-flex-1 tw-bg-gray-200 tw-border tw-border-solid tw-border-gray-400 tw-rounded-sm" />
                    </div>
                </div>
            </div>
        )
    }

}


export default PanedWindow
