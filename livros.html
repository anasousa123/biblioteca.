<?php
include 'conexao.php';

// Mensagens de feedback
$alert = "";

// Cadastro
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['cadastrar'])) {
    $id         = isset($_POST['id']) ? (int)$_POST['id'] : 0;
    $nome       = trim($_POST['nome'] ?? '');
    $autor      = trim($_POST['autor'] ?? '');
    $genero     = trim($_POST['genero'] ?? '');
    $exemplares = isset($_POST['exemplares']) ? (int)$_POST['exemplares'] : 1;

    if ($id <= 0) {
        $alert = '<div class="alert alert-danger">Informe um <strong>ID</strong> válido (número de identificação do livro).</div>';
    } elseif ($exemplares <= 0) {
        $alert = '<div class="alert alert-danger">O campo <strong>Exemplares</strong> deve ser pelo menos 1.</div>';
    } elseif ($nome === '' || $autor === '' || $genero === '') {
        $alert = '<div class="alert alert-danger">Preencha todos os campos obrigatórios.</div>';
    } else {
        $stmt = $conn->prepare("INSERT INTO livros (id, nome, autor, genero, exemplares) VALUES (?, ?, ?, ?, ?)");
        if ($stmt === false) {
            $alert = '<div class="alert alert-danger">Erro na preparação do comando SQL.</div>';
        } else {
            $stmt->bind_param("isssi", $id, $nome, $autor, $genero, $exemplares);
            if ($stmt->execute()) {
                // Redireciona para evitar reenvio do formulário
                header("Location: livros.php?ok=1");
                exit;
            } else {
                // Chave primária duplicada, etc.
                $msg = htmlspecialchars($stmt->error, ENT_QUOTES, 'UTF-8');
                $alert = "<div class='alert alert-danger'>Erro ao cadastrar: {$msg}</div>";
            }
            $stmt->close();
        }
    }
}

// Exclusão
if (isset($_GET['excluir'])) {
    $idExcluir = (int)$_GET['excluir'];
    if ($idExcluir > 0) {
        $stmt = $conn->prepare("DELETE FROM livros WHERE id = ?");
        if ($stmt) {
            $stmt->bind_param("i", $idExcluir);
            $stmt->execute();
            $stmt->close();
            header("Location: livros.php?del=1");
            exit;
        } else {
            $alert = '<div class="alert alert-danger">Erro ao preparar exclusão.</div>';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Cadastro de Livros</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
        <a class="navbar-brand" href="#">Biblioteca</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto">
                <li class="nav-item"><a class="nav-link" href="index.html">Início</a></li>
                <li class="nav-item"><a class="nav-link" href="alunos.html">Alunos</a></li>
                <li class="nav-item"><a class="nav-link" href="emprestimos.html">Empréstimos</a></li>
            </ul>
        </div>
    </div>
</nav>

<main class="container">
    <h2 class="mb-4">Cadastrar Novo Livro</h2>

    <?php
    if (isset($_GET['ok'])) {
        echo '<div class="alert alert-success">Livro cadastrado com sucesso!</div>';
    } elseif (isset($_GET['del'])) {
        echo '<div class="alert alert-warning">Livro excluído.</div>';
    } elseif ($alert) {
        echo $alert;
    }
    ?>

    <form method="POST" class="row g-3 mb-5" autocomplete="off">
        <div class="col-md-3">
            <label class="form-label">Nº Identificação (ID do Livro)</label>
            <input type="number" name="id" class="form-control" required min="1" placeholder="Ex.: 101">
        </div>
        <div class="col-md-6">
            <label class="form-label">Nome do Livro</label>
            <input type="text" name="nome" class="form-control" required>
        </div>
        <div class="col-md-6">
            <label class="form-label">Autor</label>
            <input type="text" name="autor" class="form-control" required>
        </div>
        <div class="col-md-6">
            <label class="form-label">Gênero</label>
            <input type="text" name="genero" class="form-control" required>
        </div>
        <div class="col-md-3">
            <label class="form-label">Exemplares</label>
            <input type="number" name="exemplares" class="form-control" required min="1" value="1">
        </div>
        <div class="col-12">
            <button type="submit" name="cadastrar" class="btn btn-primary">Cadastrar</button>
        </div>
    </form>

    <h2 class="mb-3">Lista de Livros</h2>
    <table class="table table-bordered table-striped">
        <thead class="table-dark">
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Autor</th>
            <th>Gênero</th>
            <th>Exemplares</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        <?php
        // Só traz as colunas que existem agora (sem indicacao)
        $resultado = $conn->query("SELECT id, nome, autor, genero, exemplares FROM livros ORDER BY nome");
        if ($resultado) {
            while ($livro = $resultado->fetch_assoc()) {
                $id   = (int)$livro['id'];
                $nome = htmlspecialchars($livro['nome'], ENT_QUOTES, 'UTF-8');
                $autor = htmlspecialchars($livro['autor'], ENT_QUOTES, 'UTF-8');
                $genero = htmlspecialchars($livro['genero'], ENT_QUOTES, 'UTF-8');
                $exemplares = (int)$livro['exemplares'];

                echo "<tr>
                        <td>{$id}</td>
                        <td>{$nome}</td>
                        <td>{$autor}</td>
                        <td>{$genero}</td>
                        <td>{$exemplares}</td>
                        <td>
                            <a class='btn btn-danger btn-sm' href='?excluir={$id}' onclick=\"return confirm('Excluir o livro ID {$id}?');\">Excluir</a>
                        </td>
                      </tr>";
            }
            $resultado->free();
        }
        ?>
        </tbody>
    </table>
</main>
</body>
</html>
