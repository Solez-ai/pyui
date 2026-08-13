import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterWidgetBase } from "./base"


class SliderValue extends TkinterWidgetBase{

    static widgetType = "slider_value"
    static displayName = "Slider with Value"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            size: { width: 180, height: 70 },
            widgetName: "Slider value",
            attrs: {
                ...this.state.attrs,
                min: {
                    label: "Min",
                    tool: Tools.NUMBER_INPUT,
                    toolProps: {placeholder: "min"},
                    value: 0,
                    onChange: (value) => this.setAttrValue("min", value)
                },
                max: {
                    label: "Max",
                    tool: Tools.NUMBER_INPUT,
                    toolProps: {placeholder: "max"},
                    value: 100,
                    onChange: (value) => this.setAttrValue("max", value)
                },
                defaultValue: {
                    label: "Default value",
                    tool: Tools.NUMBER_INPUT,
                    toolProps: {placeholder: "default"},
                    value: 50,
                    onChange: (value) => this.setAttrValue("defaultValue", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#fff0")
    }

    generateCode(variableName, parent){

        const config = convertObjectToKeyValueString(this.getConfigCode())

        const min = this.getAttrValue("min")
        const max = this.getAttrValue("max")
        const defaultValue = this.getAttrValue("defaultValue")

        return [
            `def ${variableName}_show_value(value):`,
            `    ${variableName}_value_label.config(text=f"Value: {int(float(value))}")`,
            "",
            `${variableName}_value_var = tk.DoubleVar(value=${defaultValue})`,
            `${variableName} = tk.Scale(master=${parent}, from_=${min}, to=${max}, variable=${variableName}_value_var, orient=tk.HORIZONTAL, command=${variableName}_show_value)`,
            `${variableName}.config(${config})`,
            `${variableName}_value_label = tk.Label(master=${parent}, text="Value: ${defaultValue}")`,
            `${variableName}_value_label.pack(pady=(0, 2))`,
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
        const min = this.getAttrValue("min")
        const max = this.getAttrValue("max")
        const defaultValue = this.getAttrValue("defaultValue")

        return (
            <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-1 tw-place-content-center"
                    ref={this.styleAreaRef}
                    style={this.getInnerRenderStyling()}>
                <div className="tw-text-center tw-text-xs tw-text-gray-600">Value: {defaultValue}</div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    defaultValue={defaultValue}
                    className="tw-w-full tw-pointer-events-none accent-blue-500"
                />
            </div>
        )
    }

}


export default SliderValue
