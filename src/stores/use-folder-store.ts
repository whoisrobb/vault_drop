import type { Folder } from '@/lib/types';
import { create } from 'zustand';

interface FolderStore {
  folders: Folder[];
  setFolders: (folders: Folder[]) => void;
}

export const useFolderStore = create<FolderStore>((set) => ({
  folders: [],
  setFolders: (folders) => set({ folders })
}));
