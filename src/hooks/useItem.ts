import { useCallback, useEffect, useState } from 'preact/hooks';
import Item from 'src/types/Item';
import useLocalStorage from './useLocalStorage';

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function useItem() {
  const [items, setItems] = useLocalStorage<Item[]>('itemsfyi-items', []);
  const [item, setItem] = useState<Item | undefined>(
    items[rand(0, items.length)]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchItem = useCallback(async () => {
    const res = await fetch('/items/items.json', {
      credentials: 'same-origin',
    });

    if (!res.ok || ![200, 304].includes(res.status)) {
      throw Error();
    }

    const items = (await res.json()) as Item[];

    if (item === undefined) {
      setItem(items[rand(0, items.length)]);
    }
    setItems(items);
    setLoading(false);
  }, [item, setItems]);

  const retry = useCallback(() => {
    setError(false);
    setLoading(true);
    fetchItem()
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [fetchItem]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(retry, []);

  return {
    item,
    loading,
    error,
    retry,
  };
}
