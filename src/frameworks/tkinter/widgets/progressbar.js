import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterWidgetBase } from "./base"


class Progressbar extends TkinterWidgetBase{

    static widgetType = "progressbar"
    static displayName = "Progress Bar"

    constructor(props) {
        super(props)

        this.minSize = {width: 30, height: 10}

        this.state = {
            ...this.state,
            size: { width: 180, height: 20 },
            fitContent: {width: true, height: true},
            widgetName: "Progress bar",
            attrs: {
                ...this.state.attrs,
                mode: {
                    label: "Mode",
                    tool: Tools.SELECT_DROPDOWN,
                    toolProps: {placeholder: "select mode"},
                    value: "determinate",
                    options: [{value: "determinate", label: "determinate"}, {value: "indeterminate", label: "indeterminate"}],
                    onChange: (value) => this.setAttrValue("mode", value)
                },
                maxValue: {
                    label: "Maximum",
                    tool: Tools.NUMBER_INPUT,
                    toolProps: {min: 1, max: 10000},
                    value: 100,
                    onChange: (value) => this.setAttrValue("maxValue", value)
                },
                currentValue: {
                    label: "Current value",
                    tool: Tools.NUMBER_INPUT,
                    toolProps: {min: 0, max: 10000},
                    value: 40,
                    onChange: (value) => this.setAttrValue("currentValue", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#fff0")
    }

    getConfigCode(){
        const config = {}
        return config
    }

    generateCode(variableName, parent){

        const mode = this.getAttrValue("mode")
        const maxValue = this.getAttrValue("maxValue")
        const currentValue = this.getAttrValue("currentValue")

        const code = [
            `${variableName} = ttk.Progressbar(master=${parent}, mode="${mode}", maximum=${maxValue})`,
            `${variableName}.${this.getLayoutCode()}`
        ]

        if (mode === "determinate"){
            code.splice(1, 0, `${variableName}["value"] = ${currentValue}`)
        }else{
            code.splice(1, 0, `${variableName}.start()`)
        }

        return code
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
        const current = this.getAttrValue("currentValue")
        const max = this.getAttrValue("maxValue") || 100
        const percent = Math.min(100, Math.max(0, (current / max) * 100))

        return (
            <div className="tw-w-full tw-h-full tw-flex tw-place-items-center"
                    ref={this.styleAreaRef}
                    style={this.getInnerRenderStyling()}>
                <div className="tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-[14px] tw-overflow-hidden tw-border tw-border-solid tw-border-gray-400">
                    <div className="tw-h-full tw-bg-blue-500 tw-rounded-full"
                        style={{width: `${percent}%`}} />
                </div>
            </div>
        )
    }

}


export default Progressbar
