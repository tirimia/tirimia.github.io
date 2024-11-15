import { Command } from 'cmdk'
import { useEffect, useState } from 'react'
interface KeyValue {
    key: string,
    value: string
}
type Groups = { [key: string]: KeyValue[] }
interface QuickFindProps {
    title: string,
    items: Groups | KeyValue[],
    onPick: (item: string) => void
}
export function QuickFind({ title, items, onPick }: QuickFindProps) {
    const [open, setOpen] = useState(false)

    function KVToItem({ key, value }: KeyValue) {
        return (<Command.Item key={key} value={value} onSelect={(val) => {
            onPick(val);
            setOpen(false);
        }}>{key}</Command.Item>)
    }
    function GroupToCommandGroup(title: string, group: KeyValue[]) {
        return (
            <Command.Group heading={title}>
                {group.map(KVToItem)}
            </ Command.Group>
        )
    }

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
            if (e.key === 'Escape') {
                setOpen(false)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const entries = Array.isArray(items) ? items.map(KVToItem) : Object.entries(items).map(([groupName, group]) => (
        GroupToCommandGroup(groupName, group)
    ))

    if (!open) {
        return null
    }

    return (
        <Command title={title}>
            <Command.Input placeholder={title} autoFocus data-1p-ignore data-lpignore="true" />
            <Command.List>
                {entries}
                <Command.Empty>No results found.</Command.Empty>
            </Command.List>
        </Command>
    )
}
