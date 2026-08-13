import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterWidgetBase } from "./base"


class Stopwatch extends TkinterWidgetBase{

    static widgetType = "stopwatch"
    static displayName = "Stopwatch"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            size: { width: 180, height: 80 },
            widgetName: "Stopwatch",
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

        const config = convertObjectToKeyValueString(this.getConfigCode())

        return [
            `${variableName}_running = False`,
            `${variableName}_counter = 0`,
            "",
            `def ${variableName}_tick():`,
            `    global ${variableName}_counter`,
            `    if ${variableName}_running:`,
            `        ${variableName}_counter += 1`,
            `        ${variableName}_label.config(text=f"{${variableName}_counter // 100}.{(${variableName}_counter % 100) // 10}s")`,
            `        ${variableName}_label.after(10, ${variableName}_tick)`,
            "",
            `def ${variableName}_start():`,
            `    global ${variableName}_running`,
            `    ${variableName}_running = True`,
            `    ${variableName}_tick()`,
            "",
            `def ${variableName}_stop():`,
            `    global ${variableName}_running`,
            `    ${variableName}_running = False`,
            "",
            `def ${variableName}_reset():`,
            `    global ${variableName}_counter`,
            `    ${variableName}_counter = 0`,
            `    ${variableName}_label.config(text="0.0s")`,
            "",
            `${variableName}_label = tk.Label(master=${parent}, text="0.0s", font=("Arial", 20))`,
            `${variableName}_label.config(${config})`,
            `${variableName}_start_btn = tk.Button(master=${parent}, text="Start", command=${variableName}_start)`,
            `${variableName}_stop_btn = tk.Button(master=${parent}, text="Stop", command=${variableName}_stop)`,
            `${variableName}_reset_btn = tk.Button(master=${parent}, text="Reset", command=${variableName}_reset)`,
            `${variableName}_label.pack(pady=4)`,
            `${variableName}_start_btn.pack(side=tk.LEFT, padx=4)`,
            `${variableName}_stop_btn.pack(side=tk.LEFT, padx=4)`,
            `${variableName}_reset_btn.pack(side=tk.LEFT, padx=4)`,
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
        return (
            <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-place-items-center tw-place-content-center tw-gap-1"
                    ref={this.styleAreaRef}
                    style={this.getInnerRenderStyling()}>
                <div className="tw-text-xl tw-text-gray-800 tw-font-mono">0.0s</div>
                <div className="tw-flex tw-gap-2">
                    <div className="tw-px-2 tw-py-[2px] tw-bg-green-100 tw-border tw-border-solid tw-border-green-400 tw-rounded-sm tw-text-xs">Start</div>
                    <div className="tw-px-2 tw-py-[2px] tw-bg-red-100 tw-border tw-border-solid tw-border-red-400 tw-rounded-sm tw-text-xs">Stop</div>
                    <div className="tw-px-2 tw-py-[2px] tw-bg-gray-200 tw-border tw-border-solid tw-border-gray-400 tw-rounded-sm tw-text-xs">Reset</div>
                </div>
            </div>
        )
    }

}


export default Stopwatch
