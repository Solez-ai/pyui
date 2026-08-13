import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterWidgetBase } from "./base"


class Listbox extends TkinterWidgetBase{

    static widgetType = "listbox"
    static displayName = "Listbox"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            size: { width: 140, height: 120 },
            widgetName: "Listbox",
            attrs: {
                ...this.state.attrs,
                listItems: {
                    label: "Items (comma separated)",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "item1, item2, item3", maxLength: 300},
                    value: "Item 1, Item 2, Item 3",
                    onChange: (value) => this.setAttrValue("listItems", value)
                },
                defaultSelected: {
                    label: "Default selected index",
                    tool: Tools.NUMBER_INPUT,
                    toolProps: {placeholder: "index", min: 0, max: 100},
                    value: null,
                    onChange: (value) => this.setAttrValue("defaultSelected", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#fff")
    }

    generateCode(variableName, parent){

        const config = convertObjectToKeyValueString(this.getConfigCode())

        const items = (this.getAttrValue("listItems") || "").split(",").map(item => item.trim()).filter(Boolean)
        const defaultSelected = this.getAttrValue("defaultSelected")

        const code = [
            `${variableName} = tk.Listbox(master=${parent})`,
            `${variableName}.config(${config})`,
        ]

        items.forEach(item => {
            code.push(`${variableName}.insert(tk.END, "${item}")`)
        })

        if (defaultSelected !== null && defaultSelected !== undefined && defaultSelected !== ""){
            code.push(`${variableName}.selection_set(${defaultSelected})`)
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
        const items = (this.getAttrValue("listItems") || "").split(",").map(item => item.trim()).filter(Boolean)

        return (
            <div className="tw-w-flex tw-flex-col tw-w-full tw-h-full tw-rounded-md tw-overflow-hidden">
                <div className="tw-p-1 tw-w-full tw-h-full tw-content-start tw-overflow-hidden"
                        ref={this.styleAreaRef}
                        style={this.getInnerRenderStyling()}>
                    <ul className="tw-m-0 tw-p-0 tw-list-none tw-text-xs tw-w-full">
                        {
                            items.map((item, index) => (
                                <li key={index}
                                    className={`tw-px-1 tw-py-[1px] tw-truncate ${index === 0 ? "tw-bg-blue-200" : ""}`}>
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }

}


export default Listbox
