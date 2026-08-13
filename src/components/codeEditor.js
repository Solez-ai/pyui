import { useEffect, useMemo, useRef, useState } from "react"

import { Button, Tooltip, message } from "antd"
import { CopyOutlined, CodeOutlined } from "@ant-design/icons"

import FrameWorks from "../constants/frameworks"
import { useWidgetContext } from "../canvas/context/widgetContext"

import { getTkinterCodeString, generateTkinterWidgetCodeString } from "../frameworks/tkinter/engine/code"
import { getCustomTkCodeString, generateCustomTkWidgetCodeString } from "../frameworks/customtk/engine/code"

// finds a widget node by id inside the widget tree, returns the node and its parent node
function findWidgetNodeAndParent(nodes, id, parent = null) {
    for (const node of nodes) {
        if (node.id === id) {
            return { node, parent }
        }
        if (node.children && node.children.length > 0) {
            const found = findWidgetNodeAndParent(node.children, id, node)
            if (found) {
                return found
            }
        }
    }
    return null
}

// very small python highlighter for read-only display
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

function highlightPython(code) {
    const escaped = escapeHtml(code)

    const keywords = /\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|lambda|True|False|None|pass|break|continue|try|except|finally|with|as|is|global|nonlocal|print)\b/g

    // tokenize by strings first so keywords inside strings are not highlighted
    let result = ""
    let lastIndex = 0
    const stringRegex = /("[^"\n]*"|'[^'\n]*')|(#[^\n]*)/g

    let match
    while ((match = stringRegex.exec(escaped)) !== null) {
        const before = escaped.slice(lastIndex, match.index)
        result += before.replace(keywords, '<span style="color:#c586c0">$1</span>')
            .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span style="color:#b5cea8">$1</span>')

        if (match[1]) {
            result += `<span style="color:#ce9178">${match[1]}</span>`
        } else if (match[2]) {
            result += `<span style="color:#6a9955">${match[2]}</span>`
        }
        lastIndex = stringRegex.lastIndex
    }

    result += escaped.slice(lastIndex).replace(keywords, '<span style="color:#c586c0">$1</span>')
        .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span style="color:#b5cea8">$1</span>')

    return result
}


function CodeEditor({ framework }) {

    const { widgets, widgetRefs, activeWidget } = useWidgetContext()

    const [copied, setCopied] = useState(false)
    const copyTimerRef = useRef(null)

    // track selection so the panel title can update
    const [selectedName, setSelectedName] = useState("")

    useEffect(() => {
        if (activeWidget) {
            setSelectedName(activeWidget.getDisplayName?.() || activeWidget.getWidgetName?.() || "")
        } else {
            setSelectedName("")
        }
    }, [activeWidget])

    useEffect(() => {
        return () => clearTimeout(copyTimerRef.current)
    }, [])

    const { code, isFullProject } = useMemo(() => {

        // if a widget is selected generate only its code
        if (activeWidget) {
            const found = findWidgetNodeAndParent(widgets, activeWidget.__id)

            if (!found) {
                return { code: "# select a widget to see its live code", isFullProject: false }
            }

            const parentVar = found.parent
                ? (widgetRefs.current[found.parent.id]?.current?.getVariableName?.() || "")
                : ""

            const widgetCode = framework === FrameWorks.TKINTER
                ? generateTkinterWidgetCodeString(found.node, widgetRefs.current, parentVar)
                : generateCustomTkWidgetCodeString(found.node, widgetRefs.current, parentVar)

            return { code: widgetCode, isFullProject: false }
        }

        // no widget selected -> show the full project code
        const result = framework === FrameWorks.TKINTER
            ? getTkinterCodeString(widgets, widgetRefs.current, { silent: true })
            : getCustomTkCodeString(widgets, widgetRefs.current, { silent: true })

        if (!result) {
            return { code: "# Add a Main window widget to see the generated code", isFullProject: true }
        }

        return { code: result.code, isFullProject: true }

    }, [widgets, activeWidget, framework, widgetRefs])

    const handleCopy = () => {
        if (!code) return

        navigator.clipboard?.writeText(code).then(() => {
            setCopied(true)
            clearTimeout(copyTimerRef.current)
            copyTimerRef.current = setTimeout(() => setCopied(false), 1500)
        }).catch(() => {
            message.error("Could not copy code")
        })
    }

    const codeLines = useMemo(() => code.split("\n"), [code])

    return (
        <div className="tw-w-[380px] tw-shrink-0 tw-h-full tw-flex tw-flex-col tw-border-l tw-border-solid tw-border-gray-200 tw-bg-[#1e1e1e]">
            <div className="tw-h-[50px] tw-shrink-0 tw-flex tw-place-items-center tw-gap-2 tw-px-3 tw-bg-[#252526] tw-border-b tw-border-solid tw-border-gray-700">
                <CodeOutlined className="tw-text-blue-400" />
                <div className="tw-flex tw-flex-col tw-leading-tight">
                    <span className="tw-text-sm tw-text-gray-100 tw-font-medium">
                        {selectedName ? `Code · ${selectedName}` : "Live Code"}
                    </span>
                    <span className="tw-text-[11px] tw-text-gray-400">
                        {isFullProject ? "main.py" : `${selectedName || "widget"} · python`}
                    </span>
                </div>
                <Tooltip title={copied ? "Copied!" : "Copy code"}>
                    <Button size="small"
                        className="tw-ml-auto"
                        icon={<CopyOutlined />}
                        onClick={handleCopy}
                        type={copied ? "primary" : "default"}
                    >
                        {copied ? "Copied" : "Copy"}
                    </Button>
                </Tooltip>
            </div>

            <div className="tw-flex-1 tw-overflow-auto tw-p-0 tw-text-[12.5px] tw-font-mono tw-leading-[1.5]">
                {
                    codeLines.map((line, index) => (
                        <div key={index} className="tw-flex tw-h-[19px]">
                            <span className="tw-w-[38px] tw-shrink-0 tw-text-right tw-pr-2 tw-select-none tw-text-gray-600">
                                {index + 1}
                            </span>
                            <pre
                                className="tw-m-0 tw-p-0 tw-whitespace-pre tw-text-gray-200"
                                dangerouslySetInnerHTML={{ __html: highlightPython(line) || " " }}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default CodeEditor
