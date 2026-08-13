import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterBase } from "./base"


class LabelFrame extends TkinterBase{

    static widgetType = "label_frame"
    static displayName = "Label Frame"

    constructor(props) {
        super(props)

        this.droppableTags = {
            exclude: ["image", "video", "media", "toplevel", "main_window"]
        }

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            fitContent: {width: false, height: false},
            widgetName: "Label frame",
            size: { width: 180, height: 120 },
            attrs: {
                ...this.state.attrs,
                labelText: {
                    label: "Label",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "label", maxLength: 60},
                    value: "Group",
                    onChange: (value) => this.setAttrValue("labelText", value)
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

        return [
                `${variableName} = ttk.LabelFrame(master=${parent}, text="${this.getAttrValue("labelText")}")`,
                `${variableName}.config(${config})`,
                `${variableName}.${this.getLayoutCode()}`
            ]
    }

    getImports(){
        const imports = super.getImports()
        imports.push("from tkinter import ttk")
        return imports
    }

    getToolbarAttrs(){
        const {layout, gridConfig, gridWeights, ...toolBarAttrs} = super.getToolbarAttrs()

        return ({
            id: this.__id,
            ...toolBarAttrs,
            labelText: this.state.attrs.labelText,
            layout,
            gridConfig,
            gridWeights
        })
    }

    renderContent(){
        return (
            <div className="tw-w-flex tw-flex-col tw-w-full tw-h-full tw-rounded-md tw-overflow-hidden">
                <div className="tw-bg-gray-300 tw-text-xs tw-text-gray-700 tw-px-2 tw-py-[2px]">
                    {this.getAttrValue("labelText")}
                </div>
                <div className="tw-p-2 tw-w-full tw-h-full tw-content-start tw-overflow-hidden"
                        ref={this.styleAreaRef}
                        style={this.getInnerRenderStyling()}>
                    {this.renderTkinterLayout()}
                </div>
            </div>
        )
    }

}


export default LabelFrame
