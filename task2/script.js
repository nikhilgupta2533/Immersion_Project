function addNewNote() {
  const container = document.getElementById('container');
  
  const newNote = document.createElement('div');
  newNote.className = 'note';
  newNote.contentEditable = 'true';
  newNote.textContent = 'Click to write note';
  
  newNote.ondblclick = function () {
    deleteNote(newNote);
  };

  container.insertBefore(newNote, container.lastElementChild);
}

function deleteNote(noteElement) {
  noteElement.remove();
}
