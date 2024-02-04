import { BackDropType } from '@/types/scrum.types'
import {
  GetKanbanItemsByAssignees,
  KanbanCategories
} from '@/types/supabase.tables.types'
import createSelectors from '@/zustand/config/createSelector'
import { create } from 'zustand'

interface ScrumBoardItemBackDropState {
  isOpen: boolean
  isOpenCategoryBackDrop: boolean
  category: KanbanCategories
  kanbanItem: GetKanbanItemsByAssignees | null
  backDropType: BackDropType
  setIsOpen: (
    categoryId: KanbanCategories,
    kanbanItem: GetKanbanItemsByAssignees | null,
    backDropType: BackDropType
  ) => void
  setCategory: (categoryId: KanbanCategories) => void
  closeBackDrop: () => void
  setBackDropType: (backDropType: BackDropType) => void
  setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop: boolean) => void
  setKanbanDescription: (description: string) => void
}
const initialState: ScrumBoardItemBackDropState = {
  isOpen: false,
  isOpenCategoryBackDrop: false,
  category: {} as KanbanCategories,
  kanbanItem: null,
  backDropType: 'create',
  setIsOpen: () => {},
  setCategory: () => {},
  closeBackDrop: () => {},
  setBackDropType: () => {},
  setIsOpenCategoryBackDrop: () => {},
  setKanbanDescription: () => {}
}
const scrumBoardItemBackDropStore = create<ScrumBoardItemBackDropState>()(
  (set) => ({
    ...initialState,
    setIsOpen: (category, kanbanItem = null, backDropType) =>
      set({ isOpen: true, category, kanbanItem, backDropType }),
    setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop) =>
      set({ isOpenCategoryBackDrop }),
    setCategory: (category) => set({ category }),
    setBackDropType: (backDropType) => set({ backDropType }),
    setKanbanDescription: (description: string) =>
      set((state) => ({
        kanbanItem: state.kanbanItem && { ...state.kanbanItem, description }
      })),
    closeBackDrop: () =>
      set({
        isOpen: false,
        category: {} as KanbanCategories,
        kanbanItem: null
      })
  })
)

const useScrumBoardItemBackDropStore = createSelectors(
  scrumBoardItemBackDropStore
)
export default useScrumBoardItemBackDropStore
