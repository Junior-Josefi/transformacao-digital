export function downloadMarkdownFile(content: string, fileName: string): boolean {
  try {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
    return true;
  } catch (err) {
    console.error('Erro ao baixar arquivo markdown:', err);
    return false;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Erro ao copiar para área de transferência:', err);
    return false;
  }
}

const STORAGE_KEY = 'diagnostico_transformacao_digital_draft';

export function saveDraftToStorage(data: unknown): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.warn('Não foi possível salvar rascunho no localStorage:', err);
    return false;
  }
}

export function loadDraftFromStorage<T>(): T | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as T;
  } catch (err) {
    console.warn('Erro ao carregar rascunho do localStorage:', err);
    return null;
  }
}

export function clearDraftFromStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Erro ao limpar rascunho:', err);
  }
}

