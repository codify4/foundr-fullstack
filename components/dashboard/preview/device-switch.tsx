'use client'

import { Monitor, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Device = 'mobile' | 'desktop'

interface DeviceSwitchProps {
    device: Device
    setDevice: (device: Device) => void
}

export const DeviceSwitch = ({ device, setDevice }: DeviceSwitchProps) => {
    return (
        <div className="flex items-center bg-secondary/50 rounded-lg p-1">
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-10 w-10 transition-all",
                    device === 'mobile' ? "bg-white shadow-sm text-black" : "text-muted-foreground hover:text-black"
                )}
                onClick={() => setDevice('mobile')}
            >
                <Smartphone className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-10 w-10 transition-all",
                    device === 'desktop' ? "bg-white shadow-sm text-black" : "text-muted-foreground hover:text-black"
                )}
                onClick={() => setDevice('desktop')}
            >
                <Monitor className="h-4 w-4" />
            </Button>
        </div>
    )
}