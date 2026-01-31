import { useState, type FormEvent } from 'react'
import type { Category } from '../types/category'

interface CategoryManagerProps {
  categories: Category[]
  onAdd: (name: string, color: string) => void
  onRemove: (id: string) => void
}

const palette = ['#7C8AFB', '#7DE2D1', '#F7A8B8', '#FBBF24', '#A78BFA', '#60A5FA']

export const CategoryManager = ({ categories, onAdd, onRemove }: CategoryManagerProps) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState(palette[0])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim()) return
    onAdd(name.trim(), color)
    setName('')
  }

  return (
    <div className="category-manager">
      <div className="category-header">
        <h3>Custom Categories</h3>
        <p>Create labels used across tasks and goals.</p>
      </div>
      <form className="category-form" onSubmit={handleSubmit}>
        <input
          placeholder="New category"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div className="color-options">
          {palette.map((shade) => (
            <button
              key={shade}
              type="button"
              className={`color-swatch ${color === shade ? 'active' : ''}`}
              style={{ backgroundColor: shade }}
              onClick={() => setColor(shade)}
              aria-label={`Select ${shade}`}
            />
          ))}
        </div>
        <button className="primary-button" type="submit">
          Add category
        </button>
      </form>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category.id} className="category-row">
            <span className="category-pill" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
              {category.name}
            </span>
            <button className="ghost-button danger" onClick={() => onRemove(category.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
