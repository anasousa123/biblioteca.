<?php
include 'conexao.php';

// Mensagens de feedback
$alert = "";

// Utilitário: checar disponibilidade de um livro (exemplares - pendentes)
function getDisponiveis(mysqli $conn, int $idLivro): ?int {
    // pega exemplares do livro
    $stmt = $conn->prepare("SELECT exemplares FROM livros WHERE id = ?");
    $stmt->bind_param("i", $idLivro);
    $stmt->execute();
    $stmt->bind_result($exemplares);
    $ok = $stmt->fetch();
    $stmt->close();

    if (!$ok) return null; // livro não existe

    // conta pendentes
    $stmt = $conn->prepare("SELECT COUNT(*) FROM emprestimos WHERE id_livro = ? AND status = 'pendente'");
    $stmt->bind_param("i", $idLivro);
    $stmt->execute();
    $stmt->bind_result($pendentes);
    $stmt->fetch();
    $stmt->close();

    return (int)$exemplares - (int)$pendentes;
}

// EMPRESTAR
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['emprestar'])) {
    $id_aluno        = isset($_POST['id_aluno']) ? (int)$_POST['id_aluno'] : 0;
    $id_livro        = isset($_POST['id_livro']) ? (int)$_POST['id_livro'] : 0;
    $data_emprestimo = $_POST['data_emprestimo'] ?? '';
    $data_devolucao  = $_POST['data_devolucao'] ?? '';

    // validações simples
    if ($id_aluno <= 0 || $id_livro <= 0 || $data_emprestimo === '' || $data_devolucao === '') {
        $alert = '<div class="alert alert-danger">Preencha todos os campos do empréstimo.</div>';
    } else {
        // (opcional) validar ordem de datas
        if ($data_devolucao < $data_emprestimo) {
            $alert = '<div class="alert alert-warning">A data de devolução prevista não pode ser anterior à data de empréstimo.</div>';
        } else {
            // checa disponibilidade no momento da solicitação
            $disponiveis = getDisponiveis($conn, $id_livro);
            if ($disponiveis === null) {
                $alert = '<div class="alert alert-danger">Livro não encontrado.</div>';
            } elseif ($disponiveis <= 0) {
                $alert = '<div class="alert alert-warning">Não há exemplares disponíveis deste livro no momento.</div>';
            } else {
                $stmt = $conn->prepare("INSERT INTO emprestimos (id_aluno, id_livro, data_emprestimo, data_devolucao, status) VALUES (?, ?, ?, ?, 'pendente')");
                if ($stmt) {
                    $stmt->bind_param("iiss", $id_aluno, $id_livro, $data_emprestimo, $data_devolucao);
                    if ($stmt->execute()) {
                        $stmt->close();
                        header("Location: emprestimos.php?ok=1");
                        exit;
                    } else {
                        $msg = htmlspecialchars($stmt->error, ENT_QUOTES, 'UTF-8');
                        $alert = "<div class='alert alert-danger'>Erro ao registrar empréstimo: {$msg}</div>";
                        $stmt->close();
                    }
                } else {
                    $alert = '<div class="alert alert-danger">Erro ao preparar a inserção do empréstimo.</div>';
                }
            }
        }
    }
}

// DEVOLVER
if (isset($_GET['devolver'])) {
    $idEmp = (int)$_GET['devolver'];
    if ($idEmp > 0) {
        $stmt = $conn->prepare("UPDATE emprestimos SET status='devolvido', data_devolucao = CURDATE() WHERE id = ? AND status='pendente'");
        if ($stmt) {
            $stmt->bind_param("i", $idEmp);
            $stmt->execute();
            $stmt->close();
            header("Location: emprestimos.php?dev=1");
            exit;
        } else {
            $alert = '<div class="alert alert-danger">Erro ao preparar devolução.</div>';
        }
    }
}

// Carregar selects de alunos e livros (com disponibilidade calculada)
$listaAlunos = $conn->query("SELECT id, nome, nivel_ensino FROM alunos ORDER BY nome");

// Para livros, calcula disponíveis: exemplares - pendentes
$sqlLivros = "
SELECT l.id, l.nome, l.exemplares,
       (l.exemplares - IFNULL(p.qtd, 0)) AS disponiveis
FROM livros l
LEFT JOIN (
    SELECT id_livro, COUNT(*) AS qtd
    FROM emprestimos
    WHERE status = 'pendente'
    GROUP BY id_livro
) p ON p.id_livro = l.id
ORDER BY l.nome";
$listaLivros = $conn->query($sqlLivros);

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Controle de Empréstimos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
        <a class="navbar-brand" href="#">Biblioteca</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto">
                <li class="nav-item"><a class="nav-link" href="index.html">Início</a></li>
                <li class="nav-item"><a class="nav-link" href="alunos.php">Alunos</a></li>
                <li class="nav-item"><a class="nav-link" href="livros.php">Livros</a></li>
            </ul>
        </div>
    </div>
</nav>

<main class="container">
    <h2 class="mb-4">Registrar Empréstimo</h2>

    <?php
    if (isset($_GET['ok'])) {
        echo '<div class="alert alert-success">Empréstimo registrado com sucesso!</div>';
    } elseif (isset($_GET['dev'])) {
        echo '<div class="alert alert-info">Devolução registrada.</div>';
    } elseif ($alert) {
        echo $alert;
    }
    ?>

    <form method="POST" class="row g-3 mb-5">
        <div class="col-md-6">
            <label class="form-label">Aluno</label>
            <select name="id_aluno" class="form-select" required>
                <option value="">Selecione o aluno</option>
                <?php
                if ($listaAlunos) {
                    while ($aluno = $listaAlunos->fetch_assoc()) {
                        $id = (int)$aluno['id'];
                        $nome = htmlspecialchars($aluno['nome'], ENT_QUOTES, 'UTF-8');
                        $nivel = htmlspecialchars($aluno['nivel_ensino'], ENT_QUOTES, 'UTF-8');
                        echo "<option value='{$id}'>{$nome} ({$nivel})</option>";
                    }
                    $listaAlunos->free();
                }
                ?>
            </select>
        </div>
        <div class="col-md-6">
            <label class="form-label">Livro</label>
            <select name="id_livro" class="form-select" required>
                <option value="">Selecione o livro</option>
                <?php
                if ($listaLivros) {
                    while ($livro = $listaLivros->fetch_assoc()) {
                        $id   = (int)$livro['id'];
                        $nome = htmlspecialchars($livro['nome'], ENT_QUOTES, 'UTF-8');
                        $ex   = (int)$livro['exemplares'];
                        $disp = (int)$livro['disponiveis'];
                        $disabled = $disp <= 0 ? 'disabled' : '';
                        $badge = $disp <= 0 ? ' - indisponível' : " - {$disp}/{$ex} disp.";
                        echo "<option value='{$id}' {$disabled}>{$nome}{$badge}</option>";
                    }
                    $listaLivros->free();
                }
                ?>
            </select>
        </div>
        <div class="col-md-6">
            <label class="form-label">Data de Empréstimo</label>
            <input type="date" name="data_emprestimo" class="form-control" required>
        </div>
        <div class="col-md-6">
            <label class="form-label">Data de Devolução Prevista</label>
            <input type="date" name="data_devolucao" class="form-control" required>
        </div>
        <div class="col-12">
            <button type="submit" name="emprestar" class="btn btn-primary">Emprestar</button>
        </div>
    </form>

    <h2 class="mb-3">Empréstimos Pendentes</h2>
    <table class="table table-bordered table-striped">
        <thead class="table-dark">
        <tr>
            <th>Aluno</th>
            <th>Livro</th>
            <th>Data Empréstimo</th>
            <th>Data Devolução Prevista</th>
            <th>Status</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        <?php
        $sqlPend = "SELECT e.id, a.nome AS aluno, l.nome AS livro, e.data_emprestimo, e.data_devolucao, e.status
                    FROM emprestimos e
                    JOIN alunos a ON e.id_aluno = a.id
                    JOIN livros l ON e.id_livro = l.id
                    WHERE e.status = 'pendente'
                    ORDER BY e.data_emprestimo DESC, e.id DESC";
        if ($resultado = $conn->query($sqlPend)) {
            while ($emp = $resultado->fetch_assoc()) {
                $aluno = htmlspecialchars($emp['aluno'], ENT_QUOTES, 'UTF-8');
                $livro = htmlspecialchars($emp['livro'], ENT_QUOTES, 'UTF-8');
                $de    = htmlspecialchars($emp['data_emprestimo'], ENT_QUOTES, 'UTF-8');
                $dd    = htmlspecialchars($emp['data_devolucao'], ENT_QUOTES, 'UTF-8');
                $st    = htmlspecialchars($emp['status'], ENT_QUOTES, 'UTF-8');
                $id    = (int)$emp['id'];
                echo "<tr>
                        <td>{$aluno}</td>
                        <td>{$livro}</td>
                        <td>{$de}</td>
                        <td>{$dd}</td>
                        <td>{$st}</td>
                        <td><a class='btn btn-success btn-sm' href='?devolver={$id}' onclick=\"return confirm('Confirmar devolução do empréstimo #{$id}?');\">Marcar como Devolvido</a></td>
                      </tr>";
            }
            $resultado->free();
        }
        ?>
        </tbody>
    </table>

    <h2 class="mb-3 mt-5">Histórico de Devoluções</h2>
    <table class="table table-bordered table-striped">
        <thead class="table-dark">
        <tr>
            <th>Aluno</th>
            <th>Livro</th>
            <th>Data Empréstimo</th>
            <th>Data Devolução</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <?php
        $sqlDev = "SELECT e.id, a.nome AS aluno, l.nome AS livro, e.data_emprestimo, e.data_devolucao, e.status
                   FROM emprestimos e
                   JOIN alunos a ON e.id_aluno = a.id
                   JOIN livros l ON e.id_livro = l.id
                   WHERE e.status = 'devolvido'
                   ORDER BY e.data_devolucao DESC, e.id DESC";
        if ($devolvidos = $conn->query($sqlDev)) {
            while ($emp = $devolvidos->fetch_assoc()) {
                $aluno = htmlspecialchars($emp['aluno'], ENT_QUOTES, 'UTF-8');
                $livro = htmlspecialchars($emp['livro'], ENT_QUOTES, 'UTF-8');
                $de    = htmlspecialchars($emp['data_emprestimo'], ENT_QUOTES, 'UTF-8');
                $dd    = htmlspecialchars($emp['data_devolucao'], ENT_QUOTES, 'UTF-8');
                $st    = htmlspecialchars($emp['status'], ENT_QUOTES, 'UTF-8');
                echo "<tr>
                        <td>{$aluno}</td>
                        <td>{$livro}</td>
                        <td>{$de}</td>
                        <td>{$dd}</td>
                        <td>{$st}</td>
                      </tr>";
            }
            $devolvidos->free();
        }
        ?>
        </tbody>
    </table>
</main>
</body>
</html>
