module.exports = 
    async (client) => {
        const porcentagem = {
            '🐶': {
                porcentagem: 40,
                nome: '🐶',
                id: '🐶',
                valor: 10
            },
            '🔷': {
                porcentagem: 20,
                nome: '🔷',
                id: '🔷',
                valor: 20
            },
            '🦴': {
                porcentagem: 40,
                nome: '🦴',
                id: '🦴',
                valor: 30
            }
        };

        const emojis = ['🐶', '🔷', '🦴'];

        const array = [];

        for (let i = 0; i < emojis.length; i++) {
            for (let y = 0; y < porcentagem[emojis[i]].porcentagem; y++) {
                array.push(porcentagem[emojis[i]])
            }
        }

        function embaralhar(a) {
            let indice_atual = a.length, valor_temporario, indice_aleatorio;
            while (0 !== indice_atual) {
                indice_aleatorio = Math.floor(Math.random() * indice_atual);
                indice_atual -= 1;

                valor_temporario = a[indice_atual];
                a[indice_atual] = a[indice_aleatorio];
                a[indice_aleatorio] = valor_temporario;
            }

            return a;
        }

        return client.raspadinhaEmojis = embaralhar(array);
    }
