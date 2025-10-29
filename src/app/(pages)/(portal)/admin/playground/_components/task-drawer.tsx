"use client";

import { X } from "lucide-react";

export function TaskDrawer({ isOpen, task, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Task Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {task && (
              <div className="flex flex-col gap-6">
                {/* Task Title */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Title
                  </label>
                  <p className="mt-2 text-lg font-medium">{task.content}</p>
                </div>

                {/* Task ID */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Task ID
                  </label>
                  <p className="mt-2 text-gray-700">{task.id}</p>
                </div>

                {/* Status */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Status
                  </label>
                  <div className="mt-2">
                    <span
                      className={`${task.statusColor} text-white text-xs px-2 py-1 rounded-full`}
                    >
                      {task.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Placeholder for future fields */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 italic">
                    More details will be added here in the future...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
