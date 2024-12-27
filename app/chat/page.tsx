"use client";

import { ChatHeader } from "@/components/chat/header";
import { ChatWindow } from "@/components/chat/window";
import { ChatInput } from "@/components/chat/input";
import { Sidebar } from "@/components/layout/sidebar";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <ChatHeader />
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={85}>
            <ChatWindow />
          </ResizablePanel>
          <ResizablePanel defaultSize={15}>
            <ChatInput />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}