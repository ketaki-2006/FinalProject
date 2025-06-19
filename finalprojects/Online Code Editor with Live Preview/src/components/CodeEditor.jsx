import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

const templates = {
  "Basic HTML": {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Web Page</title>
</head>
<body>
  <h1>Welcome to My Web Page</h1>
  <p>This is a basic HTML template. You can start adding your content here.</p>
</body>
</html>`,
    css: "body { font-family: Arial; color: #333; }",
    js: "console.log('Template Loaded!');",
  },
  "Bootstrap Starter": {
    html: `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
<div class="container text-center mt-5">
  <h1 class="text-primary">Hello Bootstrap</h1>
</div>`,
    css: "",
    js: "",
  },
};

const CodeEditor = () => {
  const [html, setHtml] = useState('<h1>Hello World</h1>');
  const [css, setCss] = useState('h1 { color: #4F46E5; font-family: sans-serif; }');
  const [js, setJs] = useState("console.log('Hello from JS!')");
  const [srcDoc, setSrcDoc] = useState('');
  const [layout, setLayout] = useState('split');
  const [activeTab, setActiveTab] = useState('html');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') !== 'false');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const htmlParam = params.get("html");
    const cssParam = params.get("css");
    const jsParam = params.get("js");

    if (htmlParam || cssParam || jsParam) {
      setHtml(decompressFromEncodedURIComponent(htmlParam || "") || "");
      setCss(decompressFromEncodedURIComponent(cssParam || "") || "");
      setJs(decompressFromEncodedURIComponent(jsParam || "") || "");
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <style>${css}</style>
          <body>
            ${html}
            <script>${js}<\/script>
          </body>
        </html>
      `);
    }, 300);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const tabButton = (label, value) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-1 text-sm font-medium rounded-t-lg transition-all duration-200 ${
        activeTab === value
          ? 'bg-indigo-600 text-white shadow-md'
          : darkMode
            ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  const toggleButton = (value, label) => (
    <button
      onClick={() => setLayout(value)}
      className={`px-3 py-1 text-sm rounded-md border transition-all duration-200 ${
        layout === value
          ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
          : darkMode
            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
            : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  const renderEditor = () => {
    const lang = activeTab === 'html' ? 'html' : activeTab === 'css' ? 'css' : 'javascript';
    const value = activeTab === 'html' ? html : activeTab === 'css' ? css : js;
    const onChange = activeTab === 'html' ? setHtml : activeTab === 'css' ? setCss : setJs;

    return (
      <div className={`rounded-xl shadow-inner overflow-hidden border ${darkMode ? 'border-zinc-800' : 'border-gray-300'}`}>
        <MonacoEditor
          language={lang}
          value={value}
          onChange={onChange}
          height="60vh"
          theme={darkMode ? 'vs-dark' : 'vs-light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontLigatures: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    );
  };

  const generateShareLink = () => {
    const query = new URLSearchParams({
      html: compressToEncodedURIComponent(html),
      css: compressToEncodedURIComponent(css),
      js: compressToEncodedURIComponent(js),
    }).toString();
    const shareUrl = `${window.location.origin}?${query}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Shareable link copied to clipboard!");
  };

  return (
    <div className={`${darkMode ? 'bg-zinc-950 text-white' : 'bg-white text-black'} h-screen w-full flex flex-col font-sans`}>
      {/* Header */}
      <div className={`flex flex-wrap md:flex-nowrap items-center justify-between px-4 py-3 border-b ${darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-gray-200 bg-gray-100'} shadow-sm gap-2`}>
        <h1 className="text-xl font-bold text-indigo-500 tracking-tight">CodeLive Editor</h1>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            onChange={(e) => {
              const selected = templates[e.target.value];
              if (selected) {
                setHtml(selected.html);
                setCss(selected.css);
                setJs(selected.js);
              }
            }}
            className={`px-2 py-1 rounded w-full md:w-auto ${darkMode ? 'bg-zinc-800 text-white border-zinc-600' : 'bg-white text-black border-gray-400'}`}
          >
            <option value="">Load Template</option>
            {Object.keys(templates).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <button
            onClick={generateShareLink}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md shadow"
          >
            Share
          </button>
          {toggleButton('split', 'Split View')}
          {toggleButton('editor', 'Editor Only')}
          {toggleButton('preview', 'Preview Only')}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-md border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"
          >
            {darkMode ? '☀ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {(layout === 'split' || layout === 'editor') && (
          <div className={`w-full md:w-1/2 p-4 overflow-auto ${darkMode ? 'bg-zinc-900' : 'bg-gray-100'}`}>
            <div className="mb-3 flex gap-2 border-b border-zinc-800">
              {tabButton('HTML', 'html')}
              {tabButton('CSS', 'css')}
              {tabButton('JS', 'js')}
            </div>
            {renderEditor()}
          </div>
        )}
        {(layout === 'split' || layout === 'preview') && (
          <div className={`w-full md:w-1/2 ${darkMode ? 'bg-zinc-100' : 'bg-white'} border-t md:border-t-0 md:border-l ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
            <iframe
              srcDoc={srcDoc}
              title="Live Preview"
              sandbox="allow-scripts"
              frameBorder="0"
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
