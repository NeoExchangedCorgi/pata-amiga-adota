
export function WhatHappensNext() {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-paraiso-blue dark:text-white mb-4">O que acontece depois?</h3>
      <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
        <li>Nossa equipe receberá seu relato e analisará as informações</li>
        <li>Entraremos em contato para mais detalhes, se necessário</li>
        <li>Organizaremos o resgate do animal conforme nossas possibilidades e urgência do caso</li>
        <li>O animal passará por avaliação veterinária e receberá os cuidados necessários</li>
        <li>Quando estiver recuperado, será disponibilizado para adoção</li>
      </ol>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        <strong>Atenção:</strong> Nossa capacidade de resgate é limitada pelo espaço disponível e recursos. 
        Atenderemos os casos conforme ordem de urgência e disponibilidade.
      </p>
    </div>
  );
}
