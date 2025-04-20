export default function ContactForm() {
  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      className="space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div>
        <label className="block mb-1">Имя</label>
        <input
          type="text"
          name="name"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1">Сообщение</label>
        <textarea
          name="message"
          required
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
      >
        Отправить
      </button>
    </form>
  )
}
