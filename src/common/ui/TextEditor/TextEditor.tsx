import { FC, useEffect } from 'react';
import 'quill/dist/quill.snow.css';
import './style.module.scss';

import { sanitize } from 'dompurify';
import { useQuill } from 'react-quilljs';

type ITextEditorProps = {
  defaultValue?: string;
  placeholder: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

const modules = {
  toolbar: {
    container: '#toolbar'
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

const formats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'align',
  'list',
  'indent',
  'bullet',
  'link',
  'blockquote',
  'clean'
];

export const TextEditor: FC<ITextEditorProps> = ({ defaultValue, placeholder, onChange, disabled, className }) => {
  const { quill, quillRef } = useQuill({
    modules: modules,
    formats: formats,
    placeholder
  });

  useEffect(() => {
    if (!quill) return;
    if (disabled) quill.disable();

    quill.on('text-change', () => {
      onChange && onChange(quill.root.innerHTML);
    });

    // quill.clipboard.dangerouslyPasteHTML(sanitize(defaultValue || ''));
    quill.root.innerHTML = sanitize(defaultValue || '');
    //eslint-disable-next-line
  }, [quill, disabled]);

  return (
    <div className={`${'quill'} ${className}`}>
      <div id='toolbar'>
        <span className='ql-formats'>
          <select className='ql-header' defaultValue='3'>
            <option value='1'>H1</option>
            <option value='2'>H2</option>
            <option value='3'>paragraph</option>
          </select>
        </span>
        <span className='ql-formats'>
          <select className='ql-size' defaultValue='medium'>
            <option value='small'>12px</option>
            <option value='medium'>16px</option>
            <option value='large'>24px</option>
          </select>
        </span>
        <span className='ql-formats'>
          <button className='ql-bold' />
          <button className='ql-italic' />
          <button className='ql-underline' />
          <button className='ql-strike' />
        </span>
        <span className='ql-formats'>
          <select className='ql-color' />
          <select className='ql-background'></select>
          <select className='ql-align'></select>
        </span>
        <span className='ql-formats'>
          <button className='ql-list' value='ordered' />
          <button className='ql-list' value='bullet' />
          <button className='ql-indent' value='-1' />
          <button className='ql-indent' value='+1' />
        </span>
        <span className='ql-formats'>
          <button className='ql-link' />
          <button className='ql-blockquote' />
          <button className='ql-clean' />
        </span>
      </div>
      <div ref={quillRef} />
    </div>
  );
};
