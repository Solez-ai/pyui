import { useEffect, useMemo, useState } from "react"

import { Switch } from "antd"

import { SidebarWidgetCard } from "../components/cards"

import { filterObjectListStartingWith } from "../utils/filter"
import { SearchComponent } from "../components/inputs"

import { LESSON_WIDGET_TYPES } from "../frameworks/utils/widgetLessons"


/**
 *
 * @param {function} onWidgetsUpdate - this is a callback that will be called once the sidebar is populated with widgets
 * @returns
 */
function WidgetsContainer({ sidebarContent, onWidgetsUpdate }) {


    const [searchValue, setSearchValue] = useState("")
    const [widgetData, setWidgetData] = useState(sidebarContent)
    const [lessonMode, setLessonMode] = useState(false)

    useEffect(() => {

        setWidgetData(sidebarContent)
        // if (onWidgetsUpdate){
        //     onWidgetsUpdate(widgets)
        // }

    }, [sidebarContent])

    const filteredWidgets = useMemo(() => {

        // lesson mode shows only the teaching widgets (each teaches a Python concept)
        if (!lessonMode) {
            return sidebarContent
        }

        return sidebarContent.filter((widget) => {
            const widgetType = widget.widgetClass?.widgetType
            return widgetType && LESSON_WIDGET_TYPES.includes(widgetType)
        })

    }, [sidebarContent, lessonMode])

    useEffect(() => {

        if (searchValue.length > 0) {
            const searchData = filterObjectListStartingWith(filteredWidgets, "name", searchValue)
            setWidgetData(searchData)
        } else {
            setWidgetData(filteredWidgets)
        }

    }, [searchValue, filteredWidgets])

    function onSearch(event) {

        setSearchValue(event.target.value)

    }

    return (
        <div className="tw-w-full tw-p-2 tw-gap-4 tw-flex tw-flex-col tw-overflow-x-hidden">

            <div className="tw-flex tw-place-items-center tw-gap-2 tw-px-1">
                <Switch size="small" checked={lessonMode} onChange={setLessonMode} />
                <div className="tw-flex tw-flex-col tw-leading-tight">
                    <span className="tw-text-xs tw-font-medium tw-text-gray-700">Lesson mode</span>
                    <span className="tw-text-[10px] tw-text-gray-500">Only show widgets that teach Python concepts</span>
                </div>
            </div>

            <SearchComponent onSearch={onSearch} searchValue={searchValue}
                onClear={() => setSearchValue("")} />
            <div className="tw-flex tw-flex-col tw-place-items-center tw-gap-2 tw-h-full tw-p-1">

                {
                    widgetData.map((widget, index) => {
                        return (
                            <SidebarWidgetCard key={widget.name}
                                name={widget.name}
                                img={widget.img}
                                widgetClass={widget.widgetClass}
                            />

                        )
                    })
                }
            </div>

        </div>
    )

}


export default WidgetsContainer
