import { XYCoord } from "react-dnd"
import { DragPosition } from "@/page/App/components/DotPanel/interface"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export function calculateNotExistDragPosition(
  canvasRect: DOMRect,
  monitorRect: XYCoord,
  canvasWidth: number,
  canvasHeight: number,
  canvasScrollLeft: number,
  canvasScrollTop: number,
  unitWidth: number,
  unitHeight: number,
  componentW: number,
  componentH: number,
  edgeWidth: number,
  blockColumns: number,
  blockRows: number,
  parentVerticalResize: boolean,
): DragPosition {
  // mouse position
  let relativeX = monitorRect.x - canvasRect.x + canvasScrollLeft - edgeWidth
  let relativeY = monitorRect.y - canvasRect.y + canvasScrollTop - edgeWidth

  // middle calc position
  const centerX = relativeX / unitWidth
  const centerY = relativeY / unitHeight

  let squareX: number
  let squareY: number

  let renderX: number
  let renderY: number

  squareX = Math.floor(centerX - componentW / 2)
  squareY = Math.floor(centerY - componentH / 2)
  renderX = relativeX - (componentW * unitWidth) / 2
  renderY = relativeY - (componentH * unitHeight) / 2

  return {
    squareX,
    squareY,
    renderX,
    renderY,
  } as DragPosition
}

export function calculateExistDragPosition(
  canvasRect: DOMRect,
  monitorRect: XYCoord,
  offsetRecord: XYCoord,
  canvasWidth: number,
  canvasHeight: number,
  canvasScrollLeft: number,
  canvasScrollTop: number,
  unitWidth: number,
  unitHeight: number,
  componentW: number,
  componentH: number,
  edgeWidth: number,
  blockColumns: number,
  blockRows: number,
  parentVerticalResize: boolean,
): DragPosition {
  // mouse position
  let relativeX = monitorRect.x - canvasRect.x + canvasScrollLeft - edgeWidth
  let relativeY = monitorRect.y - canvasRect.y + canvasScrollTop - edgeWidth

  let renderX = relativeX - offsetRecord.x
  let renderY = relativeY - offsetRecord.y

  let squareX = Math.floor(renderX / unitWidth)
  let squareY = Math.floor(renderY / unitHeight)

  return {
    renderX,
    renderY,
    squareX,
    squareY,
  } as DragPosition
}

export function calculateDragPosition(
  componentNode: ComponentNode,
  canvasRect: DOMRect,
  monitorRect: XYCoord,
  canvasWidth: number,
  canvasHeight: number,
  canvasScrollLeft: number,
  canvasScrollTop: number,
  unitWidth: number,
  unitHeight: number,
  edgeWidth: number,
  blockColumns: number,
  blockRows: number,
  parentVerticalResize: boolean,
  parentDisplayName: string,
): DragPosition {
  let calcResult: DragPosition

  if (
    componentNode.x == -1 &&
    componentNode.y == -1 &&
    componentNode.parentNode != parentDisplayName
  ) {
    calcResult = calculateNotExistDragPosition(
      canvasRect,
      monitorRect,
      canvasWidth,
      canvasHeight,
      canvasScrollLeft,
      canvasScrollTop,
      unitWidth,
      unitHeight,
      componentNode.w,
      componentNode.h,
      edgeWidth,
      blockColumns,
      blockRows,
      parentVerticalResize,
    )
  } else {
    calcResult = calculateNotExistDragPosition(
      canvasRect,
      monitorRect,
      canvasWidth,
      canvasHeight,
      canvasScrollLeft,
      canvasScrollTop,
      unitWidth,
      unitHeight,
      componentNode.w,
      componentNode.h,
      edgeWidth,
      blockColumns,
      blockRows,
      parentVerticalResize,
    )
  }

  if (calcResult.squareX < 0) {
    calcResult.squareX = 0
  }
  if (calcResult.squareX + componentNode.w > blockColumns) {
    calcResult.squareX = blockColumns - componentNode.w
  }
  if (calcResult.squareY < 0) {
    calcResult.squareY = 0
  }

  if (!parentVerticalResize) {
    if (calcResult.squareY + componentNode.h > blockRows) {
      calcResult.squareY = blockRows - componentNode.h
    }
  }

  if (!parentVerticalResize) {
    if (
      calcResult.renderY + (componentNode.h * unitHeight) / 2 >
      canvasHeight
    ) {
      calcResult.renderY = canvasHeight - (componentNode.h * unitHeight) / 2
    }
  }

  return calcResult
}

export function calculateNearXY(
  canvasRect: DOMRect,
  monitorRect: XYCoord,
  canvasScrollLeft: number,
  canvasScrollTop: number,
  unitWidth: number,
  unitHeight: number,
  edgeWidth: number,
): [number, number] {
  // mouse position
  let relativeX = monitorRect.x - canvasRect.x + canvasScrollLeft - edgeWidth
  let relativeY = monitorRect.y - canvasRect.y + canvasScrollTop - edgeWidth

  // near position
  const nearX = Math.floor(relativeX / unitWidth)
  const nearY = Math.floor(relativeY / unitHeight)
  return [nearX, nearY]
}

export function calculateXY(
  x: number,
  y: number,
  unitWidth: number,
  unitHeight: number,
): [l: number, t: number] {
  return [x * unitWidth + 1, y * unitHeight + 1]
}
