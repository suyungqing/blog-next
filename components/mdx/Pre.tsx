'use client';

import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useTheme } from 'next-themes';
import { BiCopy } from 'react-icons/bi';

import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import useClipboard from '@/hooks/useClipboard';

const Pre = ({ children, ...props }: any) => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const { isSupported, text, copy } = useClipboard();

  const handleCopy = async () => {
    try {
      // 将 ReactNode 转换为 HTML 字符串
      const htmlString = ReactDOMServer.renderToStaticMarkup(props.children);
      // 使用 DOMParser 将 HTML 字符串解析为 DOM 对象
      const domParser = new DOMParser();
      const dom = domParser.parseFromString(htmlString, 'text/html');
      // 提取文本内容
      const textContent = dom.body.textContent;
      // 复制文本内容到剪贴板
      // await navigator.clipboard.writeText(textContent!);
      copy(textContent!);
      toast.success('Copy Success!');
    } catch (error) {
      toast.error('Failed copy');
      console.error('Failed to copy text');
    }
  };

  useEffect(() => {
    setShow(theme === props['data-theme']);
  }, [theme, props['data-theme']]);

  return (
    <div className={cn('hidden rounded border', show && 'block')}>
      <div className="flex items-center justify-between border-b px-2 py-2 text-sm">
        <span className="font-mono">{props['data-language']}</span>
        <BiCopy
          role="button"
          size={20}
          onClick={handleCopy}
          className="hover:text-gray-600"
        />
      </div>
      <pre
        {...props}
        className="m-0 p-0"
      >
        {children}
      </pre>
    </div>
  );
};

export default Pre;
