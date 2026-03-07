import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  ConfigProvider,
  theme,
  Table,
  Form,
  Modal,
  Select,
  Input,
  Button,
} from "antd";
import type { DefaultOptionType } from "antd/es/select";
import "../App.css";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [data, setData] = useState<any[]>([]);
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm] = Form.useForm();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(stored ? stored === "dark" : prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const findRows = (value: any): any[] | null => {
    if (Array.isArray(value) && value.length > 0) {
      const allFlat = value.every(
        (item) =>
          item !== null &&
          typeof item === "object" &&
          !Array.isArray(item) &&
          Object.values(item).every((v) => v === null || typeof v !== "object"),
      );
      if (allFlat) return value;

      for (const item of value) {
        if (item !== null && typeof item === "object") {
          for (const key of Object.keys(item)) {
            const found = findRows(item[key]);
            if (found) return found;
          }
        }
      }
    }
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      for (const key of Object.keys(value)) {
        const found = findRows(value[key]);
        if (found) return found;
      }
    }
    return null;
  };

  const getData = (values: any) => {
    if (!values) return;
    axios.get(values.input).then((res) => {
      const rows = findRows(res.data) ?? [];
      setData(rows);
      if (rows.length > 0) {
        setOptions(
          Object.keys(rows[0]).map((key) => ({
            label: key,
            value: key,
          })),
        );
      }
      setIsModalOpen(true);
    });
  };

  // https://api.postalpincode.in/pincode/273164

  const handleCancel = () => setIsModalOpen(false);

  const Finish = (values: any) => {
    const newColumns = values.select.map((key: string) => ({
      title: key,
      dataIndex: key,
      key,
      render: (value: any) => {
        if (typeof value === "string" && value.startsWith("http")) {
          return (
            <a href={value} target="_blank">
              {value}
            </a>
          );
        }
        return <div className="w-auto max-w-lg">{value}</div>;
      },
    }));
    setColumns(newColumns);
    setHide(true)
    modalForm.resetFields();
    setIsModalOpen(false);
  };

  const openEditColumns = () => {
    const currentKeys = columns.map((c: any) => c.key ?? c.dataIndex).filter(Boolean);
    modalForm.setFieldsValue({ select: currentKeys });
    setIsModalOpen(true);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          borderRadius: 8,
        },
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-slate-100 to-purple-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 transition-colors duration-300">
        <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border-b border-zinc-200/60 dark:border-zinc-700/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 -960 960 960" fill="white">
                  <path d="M120-120v-720h720v720H120Zm80-520h520v-120H200v120Zm190 240h140v-160H390v160Zm0 200h140v-120H390v120ZM200-400h110v-160H200v160Zm410 0h150v-160H610v160ZM200-200h110v-120H200v120Zm410 0h150v-120H610v120Z" />
                </svg>
              </div>
              <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight">
                JSON Table
              </h1>
            </div>

            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700">
              <button
                onClick={() => setIsDarkMode(false)}
                className={`rounded-md p-1.5 transition-all duration-200 ${!isDarkMode
                    ? "bg-white dark:bg-zinc-700 shadow-sm text-amber-500"
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  }`}
                aria-label="Light theme"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor">
                  <path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z" />
                </svg>
              </button>
              <button
                onClick={() => setIsDarkMode(true)}
                className={`rounded-md p-1.5 transition-all duration-200 ${isDarkMode
                    ? "bg-white dark:bg-zinc-700 shadow-sm text-indigo-400"
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  }`}
                aria-label="Dark theme"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor">
                  <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
          <section className="rounded-xl border border-zinc-200/80 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 p-5 shadow-sm">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
              Paste any public JSON API endpoint to view its data as a table.
            </p>
            <Form onFinish={getData} layout="inline" className="w-full" style={{ display: "flex", gap: 12, flexWrap: "nowrap" }}>
              <Form.Item
                rules={[{ required: true, message: "Please enter a URL" }]}
                name="input"
                className="mb-0"
                style={{ flex: 1, minWidth: 0 }}
              >
                <Input
                  size="large"
                  placeholder="https://api.example.com/data"
                  allowClear
                />
              </Form.Item>
              <Form.Item className="mb-0" style={{ flexShrink: 0 }}>
                <Button type="primary" htmlType="submit" size="large">
                  Load
                </Button>
              </Form.Item>
            </Form>
          </section>

          {hide && (
            <section className="mt-6 rounded-xl border border-zinc-200/80 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-zinc-200/80 dark:border-zinc-700">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                    Results
                  </h2>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-700 rounded-full px-2 py-0.5">
                    {data.length} rows
                  </span>
                </div>
                <Button size="small" onClick={openEditColumns}>
                  Edit columns
                </Button>
              </div>
              <div className="overflow-auto">
                <Table
                  bordered
                  columns={columns}
                  dataSource={data}
                  expandable={{ showExpandColumn: false }}
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50"],
                    showTotal: (total: number, range: [number, number]) =>
                      `${range[0]}-${range[1]} of ${total}`,
                  }}
                  scroll={{ x: "max-content" }}
                  size="middle"
                />
              </div>
            </section>
          )}
        </main>

        <Modal
          title="Choose columns"
          open={isModalOpen}
          okText="Apply"
          okButtonProps={{ autoFocus: true, htmlType: "submit" }}
          onCancel={handleCancel}
          modalRender={(dom) => (
            <Form form={modalForm} onFinish={Finish}>
              {dom}
            </Form>
          )}
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
            Select which fields to display in the table.
          </p>
          <Form.Item rules={[{ required: true, message: "Select at least one column" }]} name="select">
            <Select mode="multiple" placeholder="Pick columns…" className="w-full" options={options} />
          </Form.Item>
        </Modal>
      </div>
    </ConfigProvider>
  );
}