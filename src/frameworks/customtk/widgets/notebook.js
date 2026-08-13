import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { CustomTkWidgetBase } from "./base"


class Notebook extends CustomTkWidgetBase{

    static widgetType = "notebook"
    static displayName = "Notebook"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            size: { width: 240, height: 140 },
            widgetName: "Notebook",
            attrs: {
                ...this.state.attrs,
                tabNames: {
                    label: "Tab names (comma separated)",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "Tab 1, Tab 2", maxLength: 200},
                    value: "Tab 1, Tab 2",
                    onChange: (value) => this.setAttrValue("tabNames", value)
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

        const tabs = (this.getAttrValue("tabNames") || "").split(",").map(item => item.trim()).filter(Boolean)

        const code = [
            `${variableName} = ctk.CTkTabview(master=${parent})`,
        ]

        tabs.forEach((tab, index) => {
            code.push(`${variableName}.add("${tab}")`)
        })

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
        const tabs = (this.getAttrValue("tabNames") || "").split(",").map(item => item.trim()).filter(Boolean)

        return (
            <div className="tw-w-flex tw-flex-col tw-w-full tw-h-full tw-rounded-md tw-overflow-hidden">
                <div className="tw-p-1 tw-w-full tw-h-full tw-content-start tw-overflow-hidden"
                        ref={this.styleAreaRef}
                        style={this.getInnerRenderStyling()}>
                    <div className="tw-flex tw-gap-[2px] tw-border-b tw-border-solid tw-border-gray-300">
                        {
                            tabs.map((tab, index) => (
                                <div key={index}
                                    className={`tw-px-2 tw-py-[2px] tw-text-[11px] tw-border tw-border-solid tw-border-gray-300 tw-rounded-t-sm
                                                ${index === 0 ? "tw-bg-white tw-border-b-white" : "tw-bg-gray-100"}`}>
                                    {tab}
                                </div>
                            ))
                        }
                    </div>
                    <div className="tw-border tw-border-solid tw-border-gray-300 tw-border-t-0 tw-h-full tw-w-full tw-bg-white" />
                </div>
            </div>
        )
    }

}


export default Notebook
