import { memo } from "react"

import { BookOutlined, BulbOutlined, CodeOutlined } from "@ant-design/icons"

import { getWidgetLesson } from "../frameworks/utils/widgetLessons"
import { useWidgetContext } from "../canvas/context/widgetContext"


/**
 * Guided lesson mode: shows the Python concept behind the selected widget.
 * Teaching widgets (counter, slider with value, todo list, etc.) get a full
 * lesson; other widgets get a friendly nudge.
 */
const LessonPanel = memo(() => {

    const { activeWidget } = useWidgetContext()

    if (!activeWidget) return null

    const lesson = getWidgetLesson(activeWidget.getWidgetType?.())

    if (!lesson) {
        return (
            <div className="tw-w-full tw-px-2 tw-py-2 tw-rounded-md tw-bg-amber-50 tw-border tw-border-solid tw-border-amber-200">
                <div className="tw-text-xs tw-text-amber-800 tw-font-medium tw-flex tw-place-items-center tw-gap-1">
                    <BulbOutlined /> Learning tip
                </div>
                <div className="tw-text-[11px] tw-text-amber-700 tw-mt-1">
                    Try the teaching widgets — Counter, Todo List, Stopwatch, Slider with Value, Color Picker and Temperature Converter each teach a real Python concept.
                </div>
            </div>
        )
    }

    return (
        <div className="tw-w-full tw-flex tw-flex-col tw-gap-2 tw-p-2 tw-rounded-md tw-bg-blue-50 tw-border tw-border-solid tw-border-blue-200">
            <div className="tw-flex tw-place-items-center tw-gap-1 tw-text-xs tw-font-medium tw-text-blue-800">
                <BookOutlined />
                <span>Lesson · {lesson.title}</span>
            </div>

            <div className="tw-text-[11px] tw-text-blue-900 tw-font-medium">
                {lesson.concept}
            </div>

            <div className="tw-text-[11px] tw-text-gray-700 tw-leading-[1.5]">
                {lesson.explanation}
            </div>

            <div className="tw-flex tw-flex-col tw-gap-1">
                {lesson.learn.map((item, index) => (
                    <div key={index} className="tw-text-[11px] tw-text-gray-700 tw-flex tw-gap-1.5">
                        <span className="tw-text-blue-600 tw-font-bold">•</span>
                        <span>{item}</span>
                    </div>
                ))}
            </div>

            <div className="tw-bg-[#1e1e1e] tw-rounded-md tw-p-2 tw-overflow-x-auto">
                <div className="tw-flex tw-place-items-center tw-gap-1 tw-text-[10px] tw-text-gray-400 tw-mb-1">
                    <CodeOutlined /> Python behind it
                </div>
                <pre className="tw-m-0 tw-text-[11px] tw-text-green-300 tw-font-mono tw-leading-[1.5]">
                    {lesson.codeExample}
                </pre>
            </div>

            <div className="tw-text-[11px] tw-text-blue-800 tw-bg-blue-100 tw-rounded-md tw-p-2">
                <span className="tw-font-medium">Try this: </span>
                {lesson.tryThis}
            </div>
        </div>
    )
})

export default LessonPanel
