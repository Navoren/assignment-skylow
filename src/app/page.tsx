'use client';

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image'
import { Box } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';


export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ prompt: string; response: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);

  const session = useSession();
  const user = session?.data?.user;

  useEffect(() => {
    const fetchMessages = async () => {
      setIsMessagesLoading(true);
      try {
        const response = await axios.get('/api/bot-messages');
        if (response.status === 200) {
          setMessages(response.data);
        } else {
          toast({
            title: 'Error',
            description: 'Failed to fetch messages',
            variant: 'destructive',
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        toast({
          title: 'Error',
          description: axiosError.message ?? 'An error occurred while fetching messages',
          variant: 'destructive',
        });
      } finally {
        setIsMessagesLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Error',
        description: 'Prompt cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/api/bot-messages', { prompt });

      if (response.status === 200) {
        setResponseMessage(response.data);
        setMessages([...messages, { prompt, response: response.data }]);
        setPrompt(''); 
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send prompt',
          variant: 'destructive',
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast({
        title: 'Error',
        description: axiosError.message ?? 'An error occurred while sending the prompt',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="flex inset-x-0 bottom-0 fixed justify-center m-3 mb-5">
        <Input
          placeholder="Enter your message here"
          className="flex rounded-full w-1/2 bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
        <Button
          className="rounded-full mx-3"
          type="submit"
          variant="secondary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send />
          )}
        </Button>
      </div>
      {/* Render all messages */}
      <div className="m-10 text-center w-1/2 mx-auto">
        {isMessagesLoading ? (
          <div>
            {Array.from({ length: 1 }).map((_, index) => (
              <div key={index} className="mb-4">
                <div className="prompt-container">
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-6 w-1/2" />
                    </CardHeader>
                  </Card>
                </div>
                <div className="response-container">
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-6 w-1/2" />
                    </CardHeader>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="grid grid-rows-1 mb-4 font-mono font-bold">
              <div className="flex justify-between prompt-container w-auto m-2">
                <Card>
                  <CardHeader>
                    <CardDescription>{message.prompt}</CardDescription>
                  </CardHeader>
                </Card>
                <Image src={user?.image || ""}
                    width={75} height={25}
                    className='rounded-lg ml-3'
                        alt={user?.name || "Avatar"} />
              </div>
              <div className="flex justify-between response-container w-auto m-2">
                <div className='rounded-lg mr-3 w-auto h-[50px] grid place-items-center'>
                  <Box size={32} />
              </div>
                <Card>
                  <CardHeader>
                    <CardDescription>{message.response}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
